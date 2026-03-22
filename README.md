# Documentation Projet Cloud

================================================================================
  README — GUIDE DE DEPLOIEMENT
  Monitoring & Telemetrie OpenStack avec Ceilometer et Gnocchi
  AngularJS + ExpressJS | OpenStack AIO Ubuntu | VM VirtualBox
================================================================================

TABLE DES MATIERES
------------------
  1. Prerequis
  2. Configuration de la VM et du Reseau Hote-VM
  3. Preparation du systeme Ubuntu
  4. Deploiement OpenStack service par service
       4.1  Configuration de base (MySQL, RabbitMQ, Memcached)
       4.2  Keystone — Service d'identite
       4.3  Glance — Service d'images
       4.4  Placement — Service de placement des ressources
       4.5  Nova — Service de calcul
       4.6  Neutron — Service reseau
       4.7  Cinder — Service de stockage bloc
       4.8  Redis — Cache et broker de messages
       4.9  Ceilometer — Collecte de metriques
       4.10 Gnocchi — Base de donnees temporelle
       4.11 Aodh — Service d'alarmes
  5. Deploiement de l'application (Windows)
  6. Validation et diagnostic
  7. Reference rapide des endpoints


================================================================================
  1. PREREQUIS
================================================================================

--- Materiel recommande (VM Ubuntu) ---

  CPU     : 4 vCPU minimum (8 recommande)
  RAM     : 12 Go minimum (16 Go recommande)
  Disque  : 60 Go minimum (SSD de preference)
  Reseau  : 2 interfaces — Bridge + Host-Only
  OS      : Ubuntu 22.04 LTS Server 64-bit

--- Logiciels requis sur l'hote Windows ---

  - VirtualBox >= 7.0
  - Node.js >= 18.x et npm >= 9.x
  - Git
  - Windows Terminal ou PowerShell
  - Navigateur moderne (Chrome, Firefox, Edge)


================================================================================
  2. CONFIGURATION DE LA VM ET DU RESEAU HOTE-VM
================================================================================

--- 2.1 Creation de la VM dans VirtualBox ---

  1. Nouvelle VM : nom "openstack-aio", type Ubuntu 22.04 64-bit
  2. RAM : 12288 Mo | CPU : 4 | Disque VDI : 60 Go (dynamique)
  3. Parametres > Reseau :
       Adaptateur 1 : Acces par pont (Bridge) — acces internet
       Adaptateur 2 : Reseau hote uniquement (Host-Only) — vboxnet0
  4. Monter l'ISO Ubuntu 22.04 et installer le systeme

--- 2.2 Configuration reseau statique dans Ubuntu ---

  Fichier a editer : /etc/netplan/00-installer-config.yaml
  Editeur          : sudo nano /etc/netplan/00-installer-config.yaml

  Contenu :

    network:
      version: 2
      ethernets:
        enp0s3:                      # Interface Bridge
          dhcp4: true
        enp0s8:                      # Interface Host-Only
          dhcp4: false
          addresses:
            - 192.168.56.10/24

  Commande d'application :

    sudo netplan apply

  Test depuis Windows (PowerShell) :

    ping 192.168.56.10

--- 2.3 Ouverture des ports (pare-feu UFW) ---

    sudo ufw allow OpenSSH
    sudo ufw allow 5000/tcp    # Keystone
    sudo ufw allow 8774/tcp    # Nova
    sudo ufw allow 8776/tcp    # Cinder
    sudo ufw allow 9696/tcp    # Neutron
    sudo ufw allow 8778/tcp    # Placement
    sudo ufw allow 9292/tcp    # Glance
    sudo ufw allow 8041/tcp    # Gnocchi
    sudo ufw allow 8042/tcp    # Aodh
    sudo ufw allow 6379/tcp    # Redis
    sudo ufw enable
    sudo ufw status


================================================================================
  3. PREPARATION DU SYSTEME UBUNTU
================================================================================

--- 3.1 Mise a jour et paquets de base ---

    sudo apt update && sudo apt upgrade -y
    sudo apt install -y git python3-pip python3-dev python3-venv \
        libffi-dev gcc libssl-dev curl wget software-properties-common

--- 3.2 Configuration du hostname ---

    sudo hostnamectl set-hostname openstack-aio
    echo '192.168.56.10  openstack-aio' | sudo tee -a /etc/hosts

--- 3.3 Desactivation du swap ---

    sudo swapoff -a
    sudo sed -i '/swap/d' /etc/fstab


================================================================================
  4. DEPLOIEMENT OPENSTACK SERVICE PAR SERVICE
================================================================================

  L'ordre d'installation est obligatoire : chaque service depend du precedent.
  IP de reference dans tous les fichiers de config : 192.168.56.10


--------------------------------------------------------------------------------
  4.1  CONFIGURATION DE BASE DU SYSTEME
       (MariaDB, RabbitMQ, Memcached)
--------------------------------------------------------------------------------

  Ces trois composants sont des prerequis partages par tous les services
  OpenStack. Ils doivent etre installes et operationnels en premier.

  >> Installation

    sudo apt install -y mariadb-server python3-pymysql
    sudo apt install -y rabbitmq-server
    sudo apt install -y memcached python3-memcache

  >> MariaDB

  Fichier a creer  : /etc/mysql/mariadb.conf.d/99-openstack.cnf
  Editeur          : sudo nano /etc/mysql/mariadb.conf.d/99-openstack.cnf

  Contenu :

    [mysqld]
    bind-address = 192.168.56.10
    default-storage-engine = innodb
    innodb_file_per_table = on
    max_connections = 4096
    collation-server = utf8_general_ci
    character-set-server = utf8

  Commandes :

    sudo service mysql restart
    sudo mysql_secure_installation

  >> RabbitMQ

    sudo rabbitmqctl add_user openstack RABBIT_PASS
    sudo rabbitmqctl set_permissions openstack ".*" ".*" ".*"

  >> Memcached

  Fichier a editer : /etc/memcached.conf
  Editeur          : sudo nano /etc/memcached.conf

  Ligne a modifier :

    -l 192.168.56.10

  Commande :

    sudo service memcached restart


--------------------------------------------------------------------------------
  4.2  KEYSTONE — Service d'identite
--------------------------------------------------------------------------------

  Keystone est le premier service OpenStack a installer.
  Il gere l'authentification et les tokens pour tous les autres services.

  >> Base de donnees

    sudo mysql -u root -p
      CREATE DATABASE keystone;
      GRANT ALL PRIVILEGES ON keystone.* TO 'keystone'@'localhost' IDENTIFIED BY 'KEYSTONE_DBPASS';
      GRANT ALL PRIVILEGES ON keystone.* TO 'keystone'@'%' IDENTIFIED BY 'KEYSTONE_DBPASS';
      EXIT;

  >> Installation

    sudo apt install -y keystone apache2 libapache2-mod-wsgi-py3

  >> Fichier de configuration principal

  Fichier a editer : /etc/keystone/keystone.conf
  Editeur          : sudo nano /etc/keystone/keystone.conf

  Sections a modifier :

    [database]
    connection = mysql+pymysql://keystone:KEYSTONE_DBPASS@192.168.56.10/keystone

    [token]
    provider = fernet

  >> Initialisation

    sudo -H -u keystone keystone-manage db_sync
    sudo keystone-manage fernet_setup --keystone-user keystone --keystone-group keystone
    sudo keystone-manage credential_setup --keystone-user keystone --keystone-group keystone

    sudo keystone-manage bootstrap --bootstrap-password ADMIN_PASS \
      --bootstrap-admin-url http://192.168.56.10:5000/v3/ \
      --bootstrap-internal-url http://192.168.56.10:5000/v3/ \
      --bootstrap-public-url http://192.168.56.10:5000/v3/ \
      --bootstrap-region-id RegionOne

  >> Apache (WSGI pour Keystone)

  Fichier a editer : /etc/apache2/apache2.conf
  Editeur          : sudo nano /etc/apache2/apache2.conf

  Ligne a ajouter :

    ServerName 192.168.56.10

  Commande :

    sudo service apache2 restart

  >> Variables d'environnement admin

  Fichier a creer  : ~/admin-openrc
  Editeur          : nano ~/admin-openrc

  Contenu :

    export OS_USERNAME=admin
    export OS_PASSWORD=ADMIN_PASS
    export OS_PROJECT_NAME=admin
    export OS_USER_DOMAIN_NAME=Default
    export OS_PROJECT_DOMAIN_NAME=Default
    export OS_AUTH_URL=http://192.168.56.10:5000/v3
    export OS_IDENTITY_API_VERSION=3

  >> Verification

    source ~/admin-openrc
    openstack token issue


--------------------------------------------------------------------------------
  4.3  GLANCE — Service d'images
--------------------------------------------------------------------------------

  Glance gere les images systeme (ISO, qcow2) utilisees par Nova.

  >> Base de donnees

    sudo mysql -u root -p
      CREATE DATABASE glance;
      GRANT ALL PRIVILEGES ON glance.* TO 'glance'@'localhost' IDENTIFIED BY 'GLANCE_DBPASS';
      GRANT ALL PRIVILEGES ON glance.* TO 'glance'@'%' IDENTIFIED BY 'GLANCE_DBPASS';
      EXIT;

  >> Enregistrement dans Keystone

    source ~/admin-openrc
    openstack user create --domain default --password GLANCE_PASS glance
    openstack role add --project service --user glance admin
    openstack service create --name glance --description "OpenStack Image" image
    openstack endpoint create --region RegionOne image public http://192.168.56.10:9292
    openstack endpoint create --region RegionOne image internal http://192.168.56.10:9292
    openstack endpoint create --region RegionOne image admin http://192.168.56.10:9292

  >> Installation

    sudo apt install -y glance

  >> Fichier de configuration principal

  Fichier a editer : /etc/glance/glance-api.conf
  Editeur          : sudo nano /etc/glance/glance-api.conf

  Sections a modifier :

    [database]
    connection = mysql+pymysql://glance:GLANCE_DBPASS@192.168.56.10/glance

    [keystone_authtoken]
    www_authenticate_uri = http://192.168.56.10:5000
    auth_url = http://192.168.56.10:5000
    memcached_servers = 192.168.56.10:11211
    auth_type = password
    project_domain_name = Default
    user_domain_name = Default
    project_name = service
    username = glance
    password = GLANCE_PASS

    [paste_deploy]
    flavor = keystone

    [glance_store]
    stores = file,http
    default_store = file
    filesystem_store_datadir = /var/lib/glance/images/

  >> Initialisation et demarrage

    sudo -H -u glance glance-manage db_sync
    sudo service glance-api restart

  >> Verification

    openstack image list


--------------------------------------------------------------------------------
  4.4  PLACEMENT — Service de placement des ressources
--------------------------------------------------------------------------------

  Placement suit l'inventaire et l'utilisation des ressources pour Nova.

  >> Base de donnees

    sudo mysql -u root -p
      CREATE DATABASE placement;
      GRANT ALL PRIVILEGES ON placement.* TO 'placement'@'localhost' IDENTIFIED BY 'PLACEMENT_DBPASS';
      GRANT ALL PRIVILEGES ON placement.* TO 'placement'@'%' IDENTIFIED BY 'PLACEMENT_DBPASS';
      EXIT;

  >> Enregistrement dans Keystone

    openstack user create --domain default --password PLACEMENT_PASS placement
    openstack role add --project service --user placement admin
    openstack service create --name placement --description "Placement API" placement
    openstack endpoint create --region RegionOne placement public http://192.168.56.10:8778
    openstack endpoint create --region RegionOne placement internal http://192.168.56.10:8778
    openstack endpoint create --region RegionOne placement admin http://192.168.56.10:8778

  >> Installation

    sudo apt install -y placement-api

  >> Fichier de configuration principal

  Fichier a editer : /etc/placement/placement.conf
  Editeur          : sudo nano /etc/placement/placement.conf

  Sections a modifier :

    [placement_database]
    connection = mysql+pymysql://placement:PLACEMENT_DBPASS@192.168.56.10/placement

    [api]
    auth_strategy = keystone

    [keystone_authtoken]
    auth_url = http://192.168.56.10:5000/v3
    memcached_servers = 192.168.56.10:11211
    auth_type = password
    project_domain_name = Default
    user_domain_name = Default
    project_name = service
    username = placement
    password = PLACEMENT_PASS

  >> Initialisation et demarrage

    sudo -H -u placement placement-manage db sync
    sudo service apache2 restart

  >> Verification

    placement-status upgrade check


--------------------------------------------------------------------------------
  4.5  NOVA — Service de calcul
--------------------------------------------------------------------------------

  Nova gere le cycle de vie des instances (machines virtuelles).

  >> Bases de donnees

    sudo mysql -u root -p
      CREATE DATABASE nova_api;
      CREATE DATABASE nova;
      CREATE DATABASE nova_cell0;
      GRANT ALL PRIVILEGES ON nova_api.* TO 'nova'@'localhost' IDENTIFIED BY 'NOVA_DBPASS';
      GRANT ALL PRIVILEGES ON nova_api.* TO 'nova'@'%' IDENTIFIED BY 'NOVA_DBPASS';
      GRANT ALL PRIVILEGES ON nova.* TO 'nova'@'localhost' IDENTIFIED BY 'NOVA_DBPASS';
      GRANT ALL PRIVILEGES ON nova.* TO 'nova'@'%' IDENTIFIED BY 'NOVA_DBPASS';
      GRANT ALL PRIVILEGES ON nova_cell0.* TO 'nova'@'localhost' IDENTIFIED BY 'NOVA_DBPASS';
      GRANT ALL PRIVILEGES ON nova_cell0.* TO 'nova'@'%' IDENTIFIED BY 'NOVA_DBPASS';
      EXIT;

  >> Enregistrement dans Keystone

    openstack user create --domain default --password NOVA_PASS nova
    openstack role add --project service --user nova admin
    openstack service create --name nova --description "OpenStack Compute" compute
    openstack endpoint create --region RegionOne compute public http://192.168.56.10:8774/v2.1
    openstack endpoint create --region RegionOne compute internal http://192.168.56.10:8774/v2.1
    openstack endpoint create --region RegionOne compute admin http://192.168.56.10:8774/v2.1

  >> Installation

    sudo apt install -y nova-api nova-conductor nova-novncproxy \
        nova-scheduler nova-compute

  >> Fichier de configuration principal

  Fichier a editer : /etc/nova/nova.conf
  Editeur          : sudo nano /etc/nova/nova.conf

  Sections a modifier :

    [DEFAULT]
    transport_url = rabbit://openstack:RABBIT_PASS@192.168.56.10:5672/
    my_ip = 192.168.56.10
    log_dir = /var/log/nova

    [api_database]
    connection = mysql+pymysql://nova:NOVA_DBPASS@192.168.56.10/nova_api

    [database]
    connection = mysql+pymysql://nova:NOVA_DBPASS@192.168.56.10/nova

    [api]
    auth_strategy = keystone

    [keystone_authtoken]
    www_authenticate_uri = http://192.168.56.10:5000/
    auth_url = http://192.168.56.10:5000/
    memcached_servers = 192.168.56.10:11211
    auth_type = password
    project_domain_name = Default
    user_domain_name = Default
    project_name = service
    username = nova
    password = NOVA_PASS

    [vnc]
    enabled = true
    server_listen = 192.168.56.10
    server_proxyclient_address = 192.168.56.10

    [glance]
    api_servers = http://192.168.56.10:9292

    [oslo_concurrency]
    lock_path = /var/lib/nova/tmp

    [placement]
    region_name = RegionOne
    project_domain_name = Default
    project_name = service
    auth_type = password
    user_domain_name = Default
    auth_url = http://192.168.56.10:5000/v3
    username = placement
    password = PLACEMENT_PASS

    # Requis pour la collecte Ceilometer
    [notifications]
    notify_on_state_change = vm_and_task_state

    [oslo_messaging_notifications]
    driver = messagingv2

  >> Initialisation et demarrage

    sudo -H -u nova nova-manage api_db sync
    sudo -H -u nova nova-manage cell_v2 map_cell0
    sudo -H -u nova nova-manage cell_v2 create_cell --name=cell1 --verbose
    sudo -H -u nova nova-manage db sync

    sudo service nova-api restart
    sudo service nova-scheduler restart
    sudo service nova-conductor restart
    sudo service nova-novncproxy restart
    sudo service nova-compute restart

  >> Verification

    nova-manage cell_v2 list_cells
    openstack compute service list


--------------------------------------------------------------------------------
  4.6  NEUTRON — Service reseau
--------------------------------------------------------------------------------

  Neutron gere les reseaux virtuels, sous-reseaux et routeurs des instances.

  >> Base de donnees

    sudo mysql -u root -p
      CREATE DATABASE neutron;
      GRANT ALL PRIVILEGES ON neutron.* TO 'neutron'@'localhost' IDENTIFIED BY 'NEUTRON_DBPASS';
      GRANT ALL PRIVILEGES ON neutron.* TO 'neutron'@'%' IDENTIFIED BY 'NEUTRON_DBPASS';
      EXIT;

  >> Enregistrement dans Keystone

    openstack user create --domain default --password NEUTRON_PASS neutron
    openstack role add --project service --user neutron admin
    openstack service create --name neutron --description "OpenStack Networking" network
    openstack endpoint create --region RegionOne network public http://192.168.56.10:9696
    openstack endpoint create --region RegionOne network internal http://192.168.56.10:9696
    openstack endpoint create --region RegionOne network admin http://192.168.56.10:9696

  >> Installation

    sudo apt install -y neutron-server neutron-plugin-ml2 \
        neutron-linuxbridge-agent neutron-dhcp-agent \
        neutron-metadata-agent neutron-l3-agent

  >> Fichier de configuration principal

  Fichier a editer : /etc/neutron/neutron.conf
  Editeur          : sudo nano /etc/neutron/neutron.conf

  Sections a modifier :

    [DEFAULT]
    core_plugin = ml2
    service_plugins = router
    transport_url = rabbit://openstack:RABBIT_PASS@192.168.56.10
    auth_strategy = keystone
    notify_nova_on_port_status_changes = true
    notify_nova_on_port_data_changes = true

    [database]
    connection = mysql+pymysql://neutron:NEUTRON_DBPASS@192.168.56.10/neutron

    [keystone_authtoken]
    www_authenticate_uri = http://192.168.56.10:5000
    auth_url = http://192.168.56.10:5000
    memcached_servers = 192.168.56.10:11211
    auth_type = password
    project_domain_name = Default
    user_domain_name = Default
    project_name = service
    username = neutron
    password = NEUTRON_PASS

    [nova]
    auth_url = http://192.168.56.10:5000
    auth_type = password
    project_domain_name = Default
    user_domain_name = Default
    region_name = RegionOne
    project_name = service
    username = nova
    password = NOVA_PASS

    [oslo_concurrency]
    lock_path = /var/lib/neutron/tmp

  >> Plugin ML2

  Fichier a editer : /etc/neutron/plugins/ml2/ml2_conf.ini
  Editeur          : sudo nano /etc/neutron/plugins/ml2/ml2_conf.ini

  Sections a modifier :

    [ml2]
    type_drivers = flat,vlan,vxlan
    tenant_network_types = vxlan
    mechanism_drivers = linuxbridge,l2population
    extension_drivers = port_security

    [ml2_type_flat]
    flat_networks = provider

    [ml2_type_vxlan]
    vni_ranges = 1:1000

    [securitygroup]
    enable_ipset = true

  >> Agent Linux Bridge

  Fichier a editer : /etc/neutron/plugins/ml2/linuxbridge_agent.ini
  Editeur          : sudo nano /etc/neutron/plugins/ml2/linuxbridge_agent.ini

  Sections a modifier :

    [linux_bridge]
    physical_interface_mappings = provider:enp0s3

    [vxlan]
    enable_vxlan = true
    local_ip = 192.168.56.10
    l2_population = true

    [securitygroup]
    enable_security_group = true
    firewall_driver = neutron.agent.linux.iptables_firewall.IptablesFirewallDriver

  >> Initialisation et demarrage

    sudo -H -u neutron neutron-manage db_upgrade

    sudo service neutron-server restart
    sudo service neutron-linuxbridge-agent restart
    sudo service neutron-dhcp-agent restart
    sudo service neutron-metadata-agent restart
    sudo service neutron-l3-agent restart

  >> Verification

    openstack network agent list


--------------------------------------------------------------------------------
  4.7  CINDER — Service de stockage bloc
--------------------------------------------------------------------------------

  Cinder fournit des volumes de stockage persistants aux instances Nova.

  >> Base de donnees

    sudo mysql -u root -p
      CREATE DATABASE cinder;
      GRANT ALL PRIVILEGES ON cinder.* TO 'cinder'@'localhost' IDENTIFIED BY 'CINDER_DBPASS';
      GRANT ALL PRIVILEGES ON cinder.* TO 'cinder'@'%' IDENTIFIED BY 'CINDER_DBPASS';
      EXIT;

  >> Enregistrement dans Keystone

    openstack user create --domain default --password CINDER_PASS cinder
    openstack role add --project service --user cinder admin
    openstack service create --name cinderv3 --description "OpenStack Block Storage" volumev3
    openstack endpoint create --region RegionOne volumev3 public \
        http://192.168.56.10:8776/v3/%\(project_id\)s
    openstack endpoint create --region RegionOne volumev3 internal \
        http://192.168.56.10:8776/v3/%\(project_id\)s
    openstack endpoint create --region RegionOne volumev3 admin \
        http://192.168.56.10:8776/v3/%\(project_id\)s

  >> Installation

    sudo apt install -y cinder-api cinder-scheduler cinder-volume tgt lvm2

  >> Preparation du volume LVM

    sudo pvcreate /dev/sdb
    sudo vgcreate cinder-volumes /dev/sdb

  >> Fichier de configuration principal

  Fichier a editer : /etc/cinder/cinder.conf
  Editeur          : sudo nano /etc/cinder/cinder.conf

  Sections a modifier :

    [DEFAULT]
    transport_url = rabbit://openstack:RABBIT_PASS@192.168.56.10
    auth_strategy = keystone
    my_ip = 192.168.56.10
    enabled_backends = lvm
    glance_api_servers = http://192.168.56.10:9292

    [database]
    connection = mysql+pymysql://cinder:CINDER_DBPASS@192.168.56.10/cinder

    [keystone_authtoken]
    www_authenticate_uri = http://192.168.56.10:5000
    auth_url = http://192.168.56.10:5000
    memcached_servers = 192.168.56.10:11211
    auth_type = password
    project_domain_name = Default
    user_domain_name = Default
    project_name = service
    username = cinder
    password = CINDER_PASS

    [lvm]
    volume_driver = cinder.volume.drivers.lvm.LVMVolumeDriver
    volume_group = cinder-volumes
    target_protocol = iscsi
    target_helper = tgtadm

    [oslo_concurrency]
    lock_path = /var/lib/cinder/tmp

  >> Initialisation et demarrage

    sudo -H -u cinder cinder-manage db sync

    sudo service cinder-api restart
    sudo service cinder-scheduler restart
    sudo service cinder-volume restart

  >> Verification

    openstack volume service list


--------------------------------------------------------------------------------
  4.8  REDIS — Cache et broker de messages pour la telemetrie
--------------------------------------------------------------------------------

  Redis est utilise par Ceilometer comme broker de messages interne.

  >> Installation

    sudo apt install -y redis-server

  >> Fichier de configuration

  Fichier a editer : /etc/redis/redis.conf
  Editeur          : sudo nano /etc/redis/redis.conf

  Lignes a modifier :

    bind 192.168.56.10 127.0.0.1
    protected-mode yes
    port 6379

  >> Demarrage

    sudo systemctl enable redis-server
    sudo systemctl restart redis-server

  >> Verification

    redis-cli -h 192.168.56.10 ping
    # Reponse attendue : PONG


--------------------------------------------------------------------------------
  4.9  CEILOMETER — Collecte de metriques
--------------------------------------------------------------------------------

  Ceilometer collecte les evenements et metriques emis par Nova, Neutron,
  Glance et Cinder, puis les achemine vers Gnocchi via Redis.

  >> Enregistrement dans Keystone

    openstack user create --domain default --password CEILOMETER_PASS ceilometer
    openstack role add --project service --user ceilometer admin

  >> Installation

    sudo apt install -y ceilometer-agent-central ceilometer-agent-notification

  >> Fichier de configuration principal

  Fichier a editer : /etc/ceilometer/ceilometer.conf
  Editeur          : sudo nano /etc/ceilometer/ceilometer.conf

  Sections a modifier :

    [DEFAULT]
    transport_url = rabbit://openstack:RABBIT_PASS@192.168.56.10

    [service_credentials]
    auth_type = password
    auth_url = http://192.168.56.10:5000/v3
    project_domain_id = default
    user_domain_id = default
    project_name = service
    username = ceilometer
    password = CEILOMETER_PASS
    interface = internalURL
    region_name = RegionOne

    [dispatcher_gnocchi]
    filter_service_activity = false

  >> Fichier de pipeline (metriques collectees)

  Fichier a editer : /etc/ceilometer/pipeline.yaml
  Editeur          : sudo nano /etc/ceilometer/pipeline.yaml

  Ce fichier definit les metriques collectees et leur intervalle.
  Metriques principales activees par defaut :
    - cpu, cpu_util
    - memory.usage
    - disk.read.bytes, disk.write.bytes
    - network.incoming.bytes, network.outgoing.bytes

  >> Initialisation et demarrage

    ceilometer-upgrade

    sudo service ceilometer-agent-central restart
    sudo service ceilometer-agent-notification restart

  >> Verification

    openstack metric list


--------------------------------------------------------------------------------
  4.10  GNOCCHI — Base de donnees temporelle
--------------------------------------------------------------------------------

  Gnocchi stocke et indexe les metriques envoyees par Ceilometer.

  >> Base de donnees

    sudo mysql -u root -p
      CREATE DATABASE gnocchi;
      GRANT ALL PRIVILEGES ON gnocchi.* TO 'gnocchi'@'localhost' IDENTIFIED BY 'GNOCCHI_DBPASS';
      GRANT ALL PRIVILEGES ON gnocchi.* TO 'gnocchi'@'%' IDENTIFIED BY 'GNOCCHI_DBPASS';
      EXIT;

  >> Enregistrement dans Keystone

    openstack user create --domain default --password GNOCCHI_PASS gnocchi
    openstack role add --project service --user gnocchi admin
    openstack service create --name gnocchi --description "Metric Service" metric
    openstack endpoint create --region RegionOne metric public http://192.168.56.10:8041
    openstack endpoint create --region RegionOne metric internal http://192.168.56.10:8041
    openstack endpoint create --region RegionOne metric admin http://192.168.56.10:8041

  >> Installation

    sudo apt install -y gnocchi-api gnocchi-metricd python3-gnocchi

  >> Fichier de configuration principal

  Fichier a editer : /etc/gnocchi/gnocchi.conf
  Editeur          : sudo nano /etc/gnocchi/gnocchi.conf

  Sections a modifier :

    [DEFAULT]
    log_dir = /var/log/gnocchi

    [api]
    auth_mode = keystone

    [indexer]
    url = mysql+pymysql://gnocchi:GNOCCHI_DBPASS@192.168.56.10/gnocchi

    [storage]
    driver = file
    file_basepath = /var/lib/gnocchi

    [keystone_authtoken]
    auth_type = password
    auth_url = http://192.168.56.10:5000/v3
    project_domain_name = Default
    user_domain_name = Default
    project_name = service
    username = gnocchi
    password = GNOCCHI_PASS
    interface = internalURL
    region_name = RegionOne

  >> Initialisation et demarrage

    sudo -H -u gnocchi gnocchi-upgrade

    sudo service gnocchi-api restart
    sudo service gnocchi-metricd restart

  >> Verification

    gnocchi status
    gnocchi archive-policy list
    gnocchi resource list


--------------------------------------------------------------------------------
  4.11  AODH — Service d'alarmes
--------------------------------------------------------------------------------

  Aodh evalue les seuils sur les metriques Gnocchi et declenche des actions
  (notifications, webhooks) lorsqu'ils sont franchis.

  >> Base de donnees

    sudo mysql -u root -p
      CREATE DATABASE aodh;
      GRANT ALL PRIVILEGES ON aodh.* TO 'aodh'@'localhost' IDENTIFIED BY 'AODH_DBPASS';
      GRANT ALL PRIVILEGES ON aodh.* TO 'aodh'@'%' IDENTIFIED BY 'AODH_DBPASS';
      EXIT;

  >> Enregistrement dans Keystone

    openstack user create --domain default --password AODH_PASS aodh
    openstack role add --project service --user aodh admin
    openstack service create --name aodh --description "Telemetry Alarming" alarming
    openstack endpoint create --region RegionOne alarming public http://192.168.56.10:8042
    openstack endpoint create --region RegionOne alarming internal http://192.168.56.10:8042
    openstack endpoint create --region RegionOne alarming admin http://192.168.56.10:8042

  >> Installation

    sudo apt install -y aodh-api aodh-evaluator aodh-notifier \
        aodh-listener aodh-expirer python3-aodh

  >> Fichier de configuration principal

  Fichier a editer : /etc/aodh/aodh.conf
  Editeur          : sudo nano /etc/aodh/aodh.conf

  Sections a modifier :

    [DEFAULT]
    transport_url = rabbit://openstack:RABBIT_PASS@192.168.56.10
    auth_strategy = keystone

    [database]
    connection = mysql+pymysql://aodh:AODH_DBPASS@192.168.56.10/aodh

    [keystone_authtoken]
    www_authenticate_uri = http://192.168.56.10:5000
    auth_url = http://192.168.56.10:5000
    memcached_servers = 192.168.56.10:11211
    auth_type = password
    project_domain_name = Default
    user_domain_name = Default
    project_name = service
    username = aodh
    password = AODH_PASS

    [service_credentials]
    auth_type = password
    auth_url = http://192.168.56.10:5000/v3
    project_domain_name = Default
    user_domain_name = Default
    project_name = service
    username = aodh
    password = AODH_PASS
    interface = internalURL
    region_name = RegionOne

  >> Initialisation et demarrage

    sudo -H -u aodh aodh-dbsync

    sudo service aodh-api restart
    sudo service aodh-evaluator restart
    sudo service aodh-notifier restart
    sudo service aodh-listener restart

  >> Exemples d'utilisation

    # Creer une alarme CPU > 80%
    aodh alarm create \
      --name cpu-high \
      --type gnocchi_resources_threshold \
      --metric cpu_util \
      --threshold 80 \
      --comparison-operator gt \
      --aggregation-method mean \
      --granularity 60 \
      --evaluation-periods 3 \
      --alarm-action 'log://'

    aodh alarm list
    aodh alarm show <alarm-id>

  >> Verification

    openstack alarming alarm list


================================================================================
  5. DEPLOIEMENT DE L'APPLICATION (WINDOWS)
================================================================================

--- 5.1 Cloner et installer les dependances ---

  Dans PowerShell Windows :

    git clone https://github.com/<votre-org>/openstack-monitor.git
    cd openstack-monitor

    # Backend
    cd server
    npm install

    # Frontend
    cd ../client
    npm install

--- 5.2 Configuration du backend ---

  Fichier a creer/editer : server/.env
  Editeur                : notepad server\.env
                           (ou VSCode : code server\.env)

  Contenu :

    # OpenStack
    OS_AUTH_URL=http://192.168.56.10:5000/v3
    OS_USERNAME=admin
    OS_PASSWORD=ADMIN_PASS
    OS_PROJECT_NAME=admin
    OS_USER_DOMAIN_NAME=Default
    OS_PROJECT_DOMAIN_NAME=Default

    # Gnocchi
    GNOCCHI_URL=http://192.168.56.10:8041

    # Aodh
    AODH_URL=http://192.168.56.10:8042

    # Application
    PORT=3000
    NODE_ENV=development

    # CORS
    ALLOWED_ORIGIN=http://localhost:8080

--- 5.3 Configuration CORS dans ExpressJS ---

  Fichier a editer : server/app.js
  Editeur          : notepad server\app.js  (ou VSCode : code server\app.js)

  Extrait a verifier/ajouter :

    const cors = require('cors');

    app.use(cors({
      origin: ['http://localhost:8080', 'http://127.0.0.1:8080'],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Auth-Token'],
      credentials: true
    }));

--- 5.4 Demarrer l'application ---

  Terminal 1 — Backend ExpressJS :

    cd server
    npm start
    # Disponible sur http://localhost:3000

  Terminal 2 — Frontend AngularJS :

    cd client
    npm start
    # Ou : npx http-server -p 8080
    # Disponible sur http://localhost:8080


================================================================================
  6. VALIDATION ET DIAGNOSTIC
================================================================================

--- 6.1 Checklist de validation ---

  [ ] VM Ubuntu demarree, 192.168.56.10 joignable depuis Windows (ping)
  [ ] MariaDB actif : sudo systemctl status mysql
  [ ] RabbitMQ actif : sudo systemctl status rabbitmq-server
  [ ] Memcached actif : sudo systemctl status memcached
  [ ] openstack token issue fonctionne (Keystone OK)
  [ ] openstack service list retourne tous les services
  [ ] openstack compute service list : tous Up (Nova)
  [ ] openstack network agent list : tous actifs (Neutron)
  [ ] openstack volume service list : tous Up (Cinder)
  [ ] gnocchi status retourne OK
  [ ] redis-cli -h 192.168.56.10 ping retourne PONG
  [ ] openstack alarming alarm list fonctionne (Aodh)
  [ ] Fichier server/.env configure avec les bons mots de passe
  [ ] npm start dans server/ demarre sans erreur sur le port 3000
  [ ] npm start dans client/ accessible sur http://localhost:8080
  [ ] Le dashboard affiche les metriques en temps reel

--- 6.2 Commandes de diagnostic (VM Ubuntu) ---

    # Etat des services
    sudo systemctl status mysql
    sudo systemctl status rabbitmq-server
    sudo systemctl status apache2          # Keystone
    sudo systemctl status nova-api
    sudo systemctl status neutron-server
    sudo systemctl status cinder-api
    sudo systemctl status gnocchi-api
    sudo systemctl status aodh-api
    sudo systemctl status ceilometer-agent-central

    # Logs en temps reel
    sudo journalctl -u nova-api -f
    sudo journalctl -u gnocchi-api -f
    sudo journalctl -u ceilometer-agent-central -f
    sudo journalctl -u aodh-evaluator -f

    # Synchronisation horloge (critique pour Keystone)
    timedatectl status
    sudo timedatectl set-ntp true

--- 6.3 Commandes de diagnostic (Windows PowerShell) ---

    # Tester la connectivite vers OpenStack
    curl http://192.168.56.10:5000/v3
    curl http://192.168.56.10:8041/v1/status

    # Verifier les ports de l'application
    netstat -ano | findstr '3000'
    netstat -ano | findstr '8080'

--- 6.4 Resolution des problemes courants ---

  ping echoue vers 192.168.56.10
    => Verifier l'adaptateur Host-Only dans VirtualBox
    => Verifier que enp0s8 est actif dans la VM : ip a

  openstack token issue echoue / erreur 401
    => Verifier ~/admin-openrc et le mot de passe ADMIN_PASS
    => sudo systemctl status apache2

  Ceilometer ne collecte pas de metriques
    => Verifier la section [oslo_messaging_notifications] dans /etc/nova/nova.conf
    => sudo journalctl -u ceilometer-agent-notification --tail 50

  Gnocchi inaccessible
    => curl http://192.168.56.10:8041/v1/status
    => sudo journalctl -u gnocchi-api --tail 50

  CORS error dans le navigateur
    => Verifier la configuration CORS dans server/app.js
    => Verifier ALLOWED_ORIGIN dans server/.env


================================================================================
  7. REFERENCE RAPIDE DES ENDPOINTS
================================================================================

  Service OpenStack         URL depuis Windows
  -------------------------------------------------
  Keystone (Identity)       http://192.168.56.10:5000/v3
  Glance (Images)           http://192.168.56.10:9292
  Nova (Compute)            http://192.168.56.10:8774/v2.1
  Cinder (Block Storage)    http://192.168.56.10:8776/v3
  Neutron (Network)         http://192.168.56.10:9696
  Placement                 http://192.168.56.10:8778
  Gnocchi (Metriques)       http://192.168.56.10:8041/v1
  Aodh (Alarmes)            http://192.168.56.10:8042/v2
  Redis                     192.168.56.10:6379

  Application Windows       URL
  -------------------------------------------------
  Backend ExpressJS         http://localhost:3000
  Frontend AngularJS        http://localhost:8080
  API Metriques             http://localhost:3000/api/metrics
  API Alarmes               http://localhost:3000/api/alarms
  API Ressources            http://localhost:3000/api/resources
  API Authentification      http://localhost:3000/api/auth/login

================================================================================
  Guide de Deploiement — Monitoring & Telemetrie OpenStack
  AngularJS + ExpressJS | Version 2.0
================================================================================