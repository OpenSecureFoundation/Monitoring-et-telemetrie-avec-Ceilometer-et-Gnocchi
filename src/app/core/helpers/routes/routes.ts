import { BehaviorSubject } from 'rxjs';

export class routes {
  public static layoutDirection: BehaviorSubject<string> =
    new BehaviorSubject<string>('');
  public static Url = '';

  static rtl = this.layoutDirection.subscribe((res: string) => {
    if (res == 'rtl') this.Url = res;
  });
  static adminDashboard: any;

  public static get baseUrl(): string {
    return routes.Url;
  }
  public static get login(): string {
    return this.baseUrl + '/login';
  }

  public static get forgot_password(): string {
    return this.baseUrl + '/forgot-password';
  }
  public static get otp_verification(): string {
    return this.baseUrl + '/otp-verification';
  }
  public static get register(): string {
    return this.baseUrl + '/register';
  }
  public static get lock_screen(): string {
    return this.baseUrl + '/lock-screen';
  }
  public static get dashboard(): string {
    return this.baseUrl + '/dashboard';
  }
  public static get customer(): string {
    return this.baseUrl + '/customer';
  }
  public static get customerList(): string {
    return this.baseUrl + '/customer/list';
  }
  public static get addCustomer(): string {
    return this.customer + '/add';
  }
  public static get editCustomer(): string {
    return this.customer + '/edit';
  }
  public static get activecustomer(): string {
    return this.customer + '/active-customers';
  }
  public static get deactivecustomer(): string {
    return this.customer + '/deactive-customers';
  }
  public static get inventory(): string {
    return this.baseUrl + '/inventory';
  }

  public static get errorPage404(): string {
    return this.baseUrl + '/error/404';
  }
  public static get errorPage500(): string {
    return this.baseUrl + '/error/500';
  }

  public static get baseUi(): string {
    return this.baseUrl + '/base-ui';
  }
  public static get blankPage(): string {
    return this.baseUrl + '/blank-page';
  }
  public static get alert(): string {
    return this.baseUi + '/alert';
  }
  public static get accordions(): string {
    return this.baseUi + '/accordions';
  }
  public static get avatar(): string {
    return this.baseUi + '/avatar';
  }
  public static get badges(): string {
    return this.baseUi + '/badges';
  }
  public static get buttons(): string {
    return this.baseUi + '/buttons';
  }
  public static get buttonGroup(): string {
    return this.baseUi + '/button-group';
  }
  public static get breadcrumb(): string {
    return this.baseUi + '/breadcrumb';
  }
  public static get cards(): string {
    return this.baseUi + '/cards';
  }
  public static get carousel(): string {
    return this.baseUi + '/carousel';
  }
  public static get dropDown(): string {
    return this.baseUi + '/drop-down';
  }
  public static get grid(): string {
    return this.baseUi + '/grid';
  }
  public static get images(): string {
    return this.baseUi + '/images';
  }
  public static get lightBox(): string {
    return this.baseUi + '/light-box';
  }
  public static get media(): string {
    return this.baseUi + '/media';
  }
  public static get modal(): string {
    return this.baseUi + '/modal';
  }
  public static get offcanvas(): string {
    return this.baseUi + '/offcanvas';
  }
  public static get pagination(): string {
    return this.baseUi + '/pagination';
  }
  public static get placeholder(): string {
    return this.baseUi + '/placeholder';
  }
  public static get popover(): string {
    return this.baseUi + '/popover';
  }
  public static get progressBars(): string {
    return this.baseUi + '/progress-bars';
  }
  public static get rangeSlider(): string {
    return this.baseUi + '/range-slider';
  }
  public static get spinner(): string {
    return this.baseUi + '/spinner';
  }
  public static get tabs(): string {
    return this.baseUi + '/tabs';
  }
  public static get sweetAlert(): string {
    return this.baseUi + '/sweet-alerts';
  }
  public static get toasts(): string {
    return this.baseUi + '/toasts';
  }
  public static get tooltip(): string {
    return this.baseUi + '/tooltip';
  }
  public static get typography(): string {
    return this.baseUi + '/typography';
  }
  public static get video(): string {
    return this.baseUi + '/video';
  }
  public static get elements(): string {
    return this.baseUrl + '/elements';
  }
  public static get ribbon(): string {
    return this.elements + '/ribbon';
  }
  public static get clipboards(): string {
    return this.elements + '/clipboards';
  }
  public static get dragDrop(): string {
    return this.elements + '/drag-drop';
  }
  public static get rating(): string {
    return this.elements + '/rating';
  }
  public static get textEditor(): string {
    return this.elements + '/text-editor';
  }
  public static get counter(): string {
    return this.elements + '/counter';
  }
  public static get scrollbar(): string {
    return this.elements + '/scrollbar';
  }
  public static get notification(): string {
    return this.elements + '/notification';
  }
  public static get stickyNote(): string {
    return this.elements + '/sticky-note';
  }
  public static get timeline(): string {
    return this.elements + '/timeline';
  }
  public static get horizontal(): string {
    return this.elements + '/horizontal-timeline';
  }
  public static get formWizard(): string {
    return this.elements + '/form-wizard';
  }
  public static get table(): string {
    return this.baseUrl + '/tables';
  }
  public static get basicTable(): string {
    return this.table + '/basic';
  }
  public static get dataTable(): string {
    return this.table + '/data-table';
  }
  public static get icon(): string {
    return this.baseUrl + '/icon';
  }
  public static get fontawesome(): string {
    return this.icon + '/fontawesome';
  }
  public static get feather(): string {
    return this.icon + '/feather';
  }
  public static get ionic(): string {
    return this.icon + '/ionic';
  }
  public static get material(): string {
    return this.icon + '/material';
  }
  public static get pe7(): string {
    return this.icon + '/pe7';
  }
  public static get themify(): string {
    return this.icon + '/themify';
  }
  public static get typicon(): string {
    return this.icon + '/typicon';
  }
  public static get weather(): string {
    return this.icon + '/weather';
  }
  public static get simpleLine(): string {
    return this.icon + '/simple-line';
  }
  public static get flag(): string {
    return this.icon + '/flag';
  }
  public static get forms(): string {
    return this.baseUrl + '/forms';
  }
  public static get basicForm(): string {
    return this.forms + '/basic-inputs';
  }
  public static get horizontalForm(): string {
    return this.forms + '/horizontal-form';
  }
  public static get verticalForm(): string {
    return this.forms + '/vertical-form';
  }
  public static get formMask(): string {
    return this.forms + '/form-mask';
  }
  public static get formValidation(): string {
    return this.forms + '/form-validation';
  }
  public static get inputGroups(): string {
    return this.forms + '/input-groups';
  }
  public static get fileUpload(): string {
    return this.forms + '/file-upload';
  }
  public static get chart(): string {
    return this.baseUrl + '/chart';
  }
  public static get apexChart(): string {
    return this.chart + '/apex-charts';
  }
  public static get ngTwoCharts(): string {
    return this.chart + '/ng2-charts';
  }
  public static get googleMaps(): string {
    return this.baseUrl + '/google-maps';
  }
  public static get profile(): string {
    return this.baseUrl + '/profile';
  }

  public static get application(): string {
    return this.baseUrl + '/application';
  }
  public static get chat(): string {
    return this.application + '/chat';
  }
  public static get calender(): string {
    return this.application + '/calender';
  }
  public static get email(): string {
    return this.application + '/email';
  }
  public static get settings(): string {
    return this.baseUrl + '/settings';
  }
  public static get taxTypes(): string {
    return this.settings + '/tax-types';
  }
  public static get companysettings(): string {
    return this.settings + '/company-settings';
  }
  public static get paymentsettings(): string {
    return this.settings + '/payment-settings';
  }
  public static get bankaccount(): string {
    return this.settings + '/bank-account';
  }
  public static get taxrats(): string {
    return this.settings + '/tax-rats';
  }
  public static get emailsettings(): string {
    return this.settings + '/email-settings';
  }
  public static get deleteAccount(): string {
    return this.settings + '/delete-account';
  }
  public static get expenseCategory(): string {
    return this.settings + '/expense-category';
  }
  public static get notifications(): string {
    return this.baseUrl + '/notifications';
  }
  public static get preferences(): string {
    return this.settings + '/preferences';
  }
  public static get profileSettings(): string {
    return this.settings + '/profile';
  }
  public static get changePassword(): string {
    return this.settings + '/change-password';
  }
  public static get templateinvoice(): string {
    return this.settings + '/template-invoice';
  }

  public static get blogs(): string {
    return this.baseUrl + '/blog';
  }
  public static get addBlogs(): string {
    return this.blogs + '/add-blogs';
  }
  public static get editblogs(): string {
    return this.blogs + '/edit-blogs';
  }
  public static get allBlogs(): string {
    return this.blogs + '/all-blogs';
  }
  public static get inactiveblog(): string {
    return this.blogs + '/inactive-blog';
  }
  public static get blogcomments(): string {
    return this.blogs + '/blog-comments';
  }

  public static get categories(): string {
    return this.blogs + '/categories';
  }
  public static get addcategories(): string {
    return this.blogs + '/add-categories';
  }
  public static get editcategories(): string {
    return this.blogs + '/edit-categories';
  }
  public static get pendingBlogs(): string {
    return this.blogs + '/pending-blogs';
  }
  public static get blogDetails(): string {
    return this.blogs + '/blog-details';
  }
  public static get expenses(): string {
    return this.baseUrl + '/expenses';
  }
  public static get expensesList(): string {
    return this.expenses + '/expenses-list';
  }
  public static get addexpenses(): string {
    return this.expenses + '/add-expenses';
  }
  public static get editexpenses(): string {
    return this.expenses + '/edit-expenses';
  }
  public static get addExpenses(): string {
    return this.expenses + '/add-expenses';
  }
  public static get ediExpenses(): string {
    return this.expenses + '/edit-expenses';
  }

  public static get payments(): string {
    return this.baseUrl + '/payments';
  }
  public static get paymentsList(): string {
    return this.payments + '/payments-list';
  }
  public static get addPayments(): string {
    return this.payments + '/add-payment';
  }
  public static get items(): string {
    return this.baseUrl + '/items';
  }
  public static get invoiceItems(): string {
    return this.items + '/invoice-items';
  }

  public static get invoiceItemList(): string {
    return this.items + '/invoice-list';
  }
  public static get invoiceItemCategory(): string {
    return this.items + '/invoice-category';
  }
  public static get estimates(): string {
    return this.baseUrl + '/estimates';
  }
  public static get estimatesList(): string {
    return this.estimates + '/estimates-list';
  }
  public static get estimatesView(): string {
    return this.estimates + '/view-estimate';
  }
  public static get addEstimates(): string {
    return this.estimates + '/add-estimate';
  }
  public static get invoice(): string {
    return this.baseUrl + '/invoices';
  }
  public static get invoicetemplate(): string {
    return this.invoice + '/invoice-template';
  }
  public static get invoicedetailsadmin(): string {
    return this.invoice + '/invoice-details-admin';
  }
  public static get invoicedetails(): string {
    return this.invoice + '/invoice-details';
  }
  public static get generalinvoice1(): string {
    return this.invoice + '/general-invoice1';
  }
  public static get generalinvoice2(): string {
    return this.invoice + '/general-invoice2';
  }
  public static get generalinvoice3(): string {
    return this.invoice + '/general-invoice3';
  }
  public static get generalinvoice4(): string {
    return this.invoice + '/general-invoice4';
  }
  public static get generalinvoice5(): string {
    return this.invoice + '/general-invoice5';
  }
  public static get invoiceone(): string {
    return this.invoice + '/invoice-one';
  }
  public static get invoiceonea(): string {
    return this.invoice + '/invoice-one-a';
  }
  public static get invoicetwo(): string {
    return this.invoice + '/invoice-two';
  }
  public static get invoicethree(): string {
    return this.invoice + '/invoice-three';
  }
  public static get invoicefour(): string {
    return this.invoice + '/invoice-four';
  }
  public static get invoicefoura(): string {
    return this.invoice + '/invoice-four-a';
  }
  public static get invoicefive(): string {
    return this.invoice + '/invoice-five';
  }
  public static get signatureinvoice(): string {
    return this.invoice + '/signature-invoice';
  }
  public static get signaturelist(): string {
    return this.baseUrl + '/signature-list';
  }
  public static get signaturepreviewinvoice(): string {
    return this.invoice + '/signature-preview-invoice';
  }
  public static get busticket(): string {
    return this.invoice + '/bus-ticket';
  }
  public static get carbookinginvoice(): string {
    return this.invoice + '/car-booking-invoice';
  }
  public static get coffeeshop(): string {
    return this.invoice + '/coffee-shop';
  }
  public static get domainhosting(): string {
    return this.invoice + '/domain-hosting';
  }
  public static get ecommerce(): string {
    return this.invoice + '/ecommerce';
  }
  public static get fitnesscenter(): string {
    return this.invoice + '/fitness-center';
  }
  public static get trainticketbooking(): string {
    return this.invoice + '/train-ticket-booking';
  }
  public static get flightbookinginvoice(): string {
    return this.invoice + '/flight-booking-invoice';
  }
  public static get hotelbooking(): string {
    return this.invoice + '/hotel-booking';
  }
  public static get internetbilling(): string {
    return this.invoice + '/internet-billing';
  }
  public static get medical(): string {
    return this.invoice + '/medical';
  }
  public static get moneyexchange(): string {
    return this.invoice + '/moneyexchange';
  }
  public static get movieticketbooking(): string {
    return this.invoice + '/movie-ticket-booking';
  }
  public static get restuarentbilling(): string {
    return this.invoice + '/restuarent-billing';
  }
  public static get studentbilling(): string {
    return this.invoice + '/student-billing';
  }
  public static get cashreceipt1(): string {
    return this.invoice + '/cashreceipt1';
  }
  public static get cashreceipt2(): string {
    return this.invoice + '/cashreceipt2';
  }
  public static get cashreceipt3(): string {
    return this.invoice + '/cashreceipt3';
  }
  public static get cashreceipt4(): string {
    return this.invoice + '/cashreceipt4';
  }
  public static get invoiceList(): string {
    return this.invoice + '/invoices-list';
  }
  public static get invoicePaid(): string {
    return this.invoice + '/paid';
  }
  public static get invoiceOverdue(): string {
    return this.invoice + '/overdue';
  }
  public static get invoiceDraft(): string {
    return this.invoice + '/draft';
  }
  public static get invoiceRecurring(): string {
    return this.invoice + '/recurring';
  }
  public static get invoiceunpaid(): string {
    return this.invoice + '/invoices-unpaid';
  }
  public static get invoicerefunded(): string {
    return this.invoice + '/invoices-refunded';
  }
  public static get invoiceCancelled(): string {
    return this.invoice + '/cancelled';
  }
  public static get addInvoice(): string {
    return this.invoice + '/add-invoice';
  }
  public static get editInvoice(): string {
    return this.invoice + '/edit-invoice';
  }
  public static get invoiceGrid(): string {
    return this.invoice + '/invoice-grid';
  }
  public static get invoiceSettings(): string {
    return this.settings + '/invoice-settings';
  }
  public static get viewInvoice(): string {
    return this.invoice + '/view-invoice';
  }
  public static get taxSettings(): string {
    return this.invoice + '/settings/tax';
  }
  public static get bankSettings(): string {
    return this.invoice + '/settings/bank';
  }
  public static get quotationspage(): string {
    return this.baseUrl + '/quotationspage';
  }
  public static get quotations(): string {
    return this.quotationspage + '/quotations';
  }
  public static get addquotation(): string {
    return this.baseUrl + '/quotationspage/add-quotation';
  }
  public static get editquotations(): string {
    return this.baseUrl + '/quotationspage/edit-quotations';
  }

  public static get addfaq(): string {
    return this.baseUrl + '/add-faq';
  }
  public static get editfaq(): string {
    return this.baseUrl + '/edit-faq';
  }

  public static get membership(): string {
    return this.baseUrl + '/membership';
  }
  public static get addmembership(): string {
    return this.membership + '/add-membership';
  }
  public static get membershipaddons(): string {
    return this.membership + '/membership-addons';
  }
  public static get membershipplans(): string {
    return this.membership + '/membership-plans';
  }
  public static get subscribers(): string {
    return this.membership + '/subscribers';
  }
  public static get transactions(): string {
    return this.membership + '/transactions';
  }
  public static get location(): string {
    return this.baseUrl + '/location';
  }
  public static get cities(): string {
    return this.location + '/cities';
  }
  public static get states(): string {
    return this.location + '/states';
  }
  public static get addstate(): string {
    return this.location + '/add-state';
  }
  public static get editstate(): string {
    return this.location + '/edit-state';
  }
  public static get addcity(): string {
    return this.location + '/add-city';
  }
  public static get editcity(): string {
    return this.location + '/edit-city';
  }
  public static get addcountries(): string {
    return this.location + '/add-countries';
  }
  public static get editcountries(): string {
    return this.location + '/edit-countries';
  }
  public static get countries(): string {
    return this.location + '/countries';
  }
  public static get manageuser(): string {
    return this.baseUrl + '/manageusers';
  }
  public static get adduser(): string {
    return this.manageuser + '/add-user';
  }
  public static get edituser(): string {
    return this.manageuser + '/edit-user';
  }
  public static get users(): string {
    return this.manageuser + '/users';
  }
  public static get purchasepage(): string {
    return this.baseUrl + '/purchases';
  }
  public static get purchases(): string {
    return this.purchasepage + '/purchases';
  }
  public static get purchaseorders(): string {
    return this.baseUrl + '/purchase-orders';
  }
  public static get debitnotes(): string {
    return this.baseUrl + '/debit-notes';
  }
  public static get rolespermission(): string {
    return this.baseUrl + '/roles-permission';
  }
  public static get deleteaccountrequest(): string {
    return this.baseUrl + '/delete-account-request';
  }
  public static get ticketdetails(): string {
    return this.baseUrl + '/ticket-pages/ticket-details';
  }
  public static get ticketsopen(): string {
    return this.baseUrl + '/ticket-pages/tickets-open';
  }
  public static get ticketsresolved(): string {
    return this.baseUrl + '/ticket-pages/tickets-resolved';
  }
  public static get ticketsclosed(): string {
    return this.baseUrl + '/ticket-pages/tickets-closed';
  }
  public static get tickets(): string {
    return this.baseUrl + '/ticket-pages/tickets';
  }
  public static get ticketlistopen(): string {
    return this.baseUrl + '/ticket-pages/tickets-list-open';
  }
  public static get ticketlistresolved(): string {
    return this.baseUrl + '/ticket-pages/tickets-list-resolved';
  }
  public static get ticketlistclosed(): string {
    return this.baseUrl + '/ticket-pages/tickets-list-closed';
  }
  public static get ticketscancelled(): string {
    return this.baseUrl + '/ticket-pages/tickets-cancelled';
  }
  public static get ticketsdraft(): string {
    return this.baseUrl + '/ticket-pages/tickets-draft';
  }
  public static get ticketsoverdue(): string {
    return this.baseUrl + '/ticket-pages/tickets-overdue';
  }
  public static get ticketskanban(): string {
    return this.baseUrl + '/ticket-pages/tickets-kanban';
  }
  public static get ticketslist(): string {
    return this.baseUrl + '/ticket-pages/tickets-list';
  }
  public static get ticketslistpending(): string {
    return this.baseUrl + '/ticket-pages/tickets-list-pending';
  }
  public static get ticketslistoverdue(): string {
    return this.baseUrl + '/ticket-pages/tickets-list-overdue';
  }
  public static get ticketslistdraft(): string {
    return this.baseUrl + '/ticket-pages/tickets-list-draft';
  }
  public static get ticketslistrecurring(): string {
    return this.baseUrl + '/ticket-pages/tickets-list-recurring';
  }
  public static get ticketspending(): string {
    return this.baseUrl + '/ticket-pages/tickets-pending';
  }
  public static get ticketslistcancelled(): string {
    return this.baseUrl + '/ticket-pages/tickets-list-cancelled';
  }
  public static get ticketsrecurring(): string {
    return this.baseUrl + '/ticket-pages/tickets-recurring';
  }
  public static get contactmessages(): string {
    return this.baseUrl + '/contact-messages';
  }
  public static get contactdetails(): string {
    return this.baseUrl + '/contact-details';
  }
  public static get faq(): string {
    return this.baseUrl + '/faq';
  }
  public static get testimonialpage(): string {
    return this.baseUrl + '/testimonial-page';
  }
  public static get testimonials(): string {
    return this.testimonialpage + '/testimonials';
  }
  public static get addtestimonials(): string {
    return this.baseUrl + '/testimonial-page/add-testimonials';
  }
  public static get edittestimonials(): string {
    return this.baseUrl + '/testimonial-page/edit-testimonials';
  }
  public static get ledger(): string {
    return this.baseUrl + '/ledger';
  }
  public static get recurringpages(): string {
    return this.baseUrl + '/recurring-pages';
  }
  public static get recurringinvoices(): string {
    return this.recurringpages + '/recurring-invoices';
  }
  public static get recurringpaid(): string {
    return this.baseUrl + '/recurring-pages/recurring-paid';
  }
  public static get recurringpending(): string {
    return this.baseUrl + '/recurring-pages/recurring-pending';
  }
  public static get recurringoverdue(): string {
    return this.baseUrl + '/recurring-pages/recurring-overdue';
  }
  public static get recurringdraft(): string {
    return this.baseUrl + '/recurring-pages/recurring-draft';
  }
  public static get recurring(): string {
    return this.baseUrl + '/recurring-pages/recurring';
  }
  public static get recurringcancelled(): string {
    return this.baseUrl + '/recurring-pages/recurring-cancelled';
  }
  public static get productservice(): string {
    return this.baseUrl + '/product-service';
  }
  public static get productlist(): string {
    return this.productservice + '/product-list';
  }
  public static get category(): string {
    return this.productservice + '/category';
  }
  public static get units(): string {
    return this.productservice + '/units';
  }
  public static get addunits(): string {
    return this.productservice + '/add-units';
  }
  public static get editunits(): string {
    return this.productservice + '/edit-units';
  }

  public static get addproducts(): string {
    return this.baseUrl + '/product-service/add-products';
  }
  public static get editproducts(): string {
    return this.baseUrl + '/product-service/edit-products';
  }
  public static get customerdetailspage(): string {
    return this.baseUrl + '/customerdetailspage';
  }
  public static get customerdetails(): string {
    return this.baseUrl + '/customerdetailspage/customer-details';
  }
  public static get customerdetailspaid(): string {
    return this.baseUrl + '/customerdetailspage/customer-details-paid';
  }
  public static get customerdetailscancel(): string {
    return this.baseUrl + '/customerdetailspage/customer-details-cancel';
  }
  public static get creditnotepage(): string {
    return this.baseUrl + '/credit-note-pages';
  }
  public static get creditnotes(): string {
    return this.creditnotepage + '/credit-notes';
  }
  public static get addcreditnotes(): string {
    return this.baseUrl + '/credit-note-pages/add-credit-notes';
  }
  public static get editcreditnotes(): string {
    return this.baseUrl + '/credit-note-pages/edit-credit-notes';
  }
  public static get creditnotesrecurring(): string {
    return this.baseUrl + '/credit-note-pages/credit-notes-recurring';
  }
  public static get creditnotesoverdue(): string {
    return this.baseUrl + '/credit-note-pages/credit-notes-overdue';
  }
  public static get creditnotesdraft(): string {
    return this.baseUrl + '/credit-note-pages/credit-notes-draft';
  }
  public static get creditnotesdetails(): string {
    return this.baseUrl + '/credit-note-pages/credit-notes-details';
  }
  public static get creditnotespending(): string {
    return this.baseUrl + '/credit-note-pages/credit-notes-pending';
  }
  public static get creditnotescancelled(): string {
    return this.baseUrl + '/credit-note-pages/credit-notes-cancelled';
  }
  public static get purchase(): string {
    return this.baseUrl + '/purchasepage/purchases';
  }
  public static get editpurchases(): string {
    return this.baseUrl + '/purchasepage/edit-purchases';
  }
  public static get addpurchases(): string {
    return this.baseUrl + '/purchasepage/add-purchases';
  }
  public static get addpurchasereturn(): string {
    return this.baseUrl + '/purchasepage/add-purchase-return';
  }
  public static get editpurchasereturn(): string {
    return this.baseUrl + '/purchasepage/edit-purchase-return';
  }
  public static get addpurchasesorder(): string {
    return this.baseUrl + '/purchasepage/add-purchases-order';
  }
  public static get purchasesdetails(): string {
    return this.baseUrl + '/purchasepage/purchases-details';
  }
  public static get paymentsummary(): string {
    return this.baseUrl + '/payment-summary';
  }
  public static get permission(): string {
    return this.baseUrl + '/permission';
  }
  public static get payonline(): string {
    return this.baseUrl + '/pay-online';
  }
  public static get mailpayinvoice(): string {
    return this.baseUrl + '/mail-pay-invoice';
  }
  public static get pages(): string {
    return this.baseUrl + '/pages';
  }
  public static get addpage(): string {
    return this.pages + '/add-page';
  }
  public static get addpages(): string {
    return this.pages + '/add-pages';
  }
  public static get page(): string {
    return this.pages + '/page';
  }
  public static get report(): string {
    return this.baseUrl + '/report';
  }
  public static get companies(): string {
    return this.baseUrl + '/super-admin/companies';
  }
  public static get subscription(): string {
    return this.baseUrl + '/super-admin/subscription';
  }
  public static get packages(): string {
    return this.baseUrl + '/super-admin/packages';
  }
  public static get domainRequest(): string {
    return this.baseUrl + '/super-admin/domain-request';
  }
  public static get domain(): string {
    return this.baseUrl + '/super-admin/domain';
  }
  public static get purchaseTransaction(): string {
    return this.baseUrl + '/super-admin/purchase-transaction';
  }
  public static get superAdminDashboard(): string {
    return this.baseUrl + '/super-admin/dashboard';
  }
  public static get catalogueList(): string {
    console.log('plan list');
    return this.baseUrl + '/super-admin/catalogue-list';
  }
  public static get planDetail(): string {
    console.log('routing');
    return this.baseUrl + '/super-admin/catalogue-view';
  }
  public static get plansList(): string {
    return this.baseUrl + '/super-admin/plans-list';
  }
  public static get expenseReport(): string {
    return this.report + '/expense-report';
  }
  public static get purchaseReport(): string {
    return this.baseUrl + '/report/purchase-report';
  }
  public static get purchaseReturnReport(): string {
    return this.baseUrl + '/report/purchase-return-report';
  }
  public static get salesReport(): string {
    return this.baseUrl + '/report/sales-report';
  }
  public static get salesReturnReport(): string {
    return this.baseUrl + '/report/sales-return-report';
  }
  public static get quotationReport(): string {
    return this.baseUrl + '/report/quotation-report';
  }
  public static get paymentReport(): string {
    return this.report + '/payment-report';
  }
  public static get stockReport(): string {
    return this.report + '/stock-report';
  }
  public static get lowStockReport(): string {
    return this.report + '/low-stock-report';
  }
  public static get incomeReport(): string {
    return this.report + '/income-report';
  }
  public static get taxReport(): string {
    return this.baseUrl + '/report/tax-report';
  }
  public static get profitLoss(): string {
    return this.baseUrl + '/report/profit-loss-list';
  }
  public static get formSelect2(): string {
    return this.baseUrl + '/forms/form-select';
  }
  public static get taxPurchase(): string {
    return this.baseUrl + '/report/tax-purchase';
  }
  public static get planBilling(): string {
    return this.settings + '/plan-billing';
  }
  public static get twoFactor(): string {
    return this.settings + '/two-factor';
  }
  public static get customField(): string {
    return this.settings + '/custom-field';
  }
  public static get allInventory(): string {
    return this.inventory + '/all-inventory';
  }
  public static get inventoryHistory(): string {
    return this.inventory + '/inventory-history';
  }
  public static get dataTables(): string {
    return this.baseUrl + '/tables/data-table';
  }
  public static get customerLedger(): string {
    return this.baseUrl + '/customer/ledger';
  }
  public static get vendorsList(): string {
    return this.baseUrl + '/vendors/list';
  }
  public static get vendorsLedger(): string {
    return this.baseUrl + '/vendors/ledger';
  }
  public static get deliveryChallansList(): string {
    return this.baseUrl + '/delivery-challans/list';
  }
  public static get addDeliveryChallans(): string {
    return this.baseUrl + '/delivery-challans/add-delivery-challans';
  }
  public static get editDeliveryChallans(): string {
    return this.baseUrl + '/delivery-challans/edit-delivery-challans';
  }
  public static get emailTemplate(): string {
    return this.settings + '/email-template';
  }
  public static get seoSetting(): string {
    return this.settings + '/seo-settings';
  }
  public static get sassSetting(): string {
    return this.settings + '/sass-settings';
  }
  public static get sassLogin(): string {
    return this.baseUrl + '/sass-login';
  }
  public static get sassRegister(): string {
    return this.baseUrl + '/sass-register';
  }
  public static get invoiceSubscription(): string {
    return this.baseUrl + '/invoices/invoice-subscription';
  }
}
