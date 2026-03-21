export interface pageSelection {
  skip: number;
  limit: number;
}
export interface apiResultFormat {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  totalData: number;
}
export interface vendor {
  sNo: number;
  name: string;
  img: string;
  email: string;
  phone: string;
  created: string;
  balance: string;
}
export interface customers {
  id: number;
  img: string;
  name: string;
  email: string;
  phone: string;
  balance: string;
  invoice: string;
  created: string;
  status: string;
}
export interface customer {
  id: number;
  img: string;
  name: string;
  email: string;
  phone: string;
  balance: string;
  invoice: string;
  created: string;
  status: string;
}
export interface recurring {
  id: number;
  ticketId: string;
  subject: string;
  assigned: string;
  assignedPerson: string;
  assignedDate: string;
  createdOn: string;
  dueDate: string;
  assignee: string;
  assigneeImg: string;
  assigneePho: number;
  lastReply: string;
  priority: string;
  status: string;
  status1: string;
}
export interface pending {
  invoiceId: number;
  category: string;
  img: string;
  invoicePerson: string;
  mailId: string | number;
  totalAmount: number;
  paidAmount: number;
  paymentmode: string;
  balance: number;
  id: number;
  ticketId: string;
  subject: string;
  assigned: string;
  assignedPerson: string;
  assignedDate: string;
  createdOn: string;
  dueDate: string;
  assignee: string;
  assigneeImg: string;
  assigneePho: number;
  lastReply: string;
  priority: string;
  status: string;
}
export interface overdue {
  id: number;
  ticketId: string;
  subject: string;
  assigned: string;
  assignedPerson: string;
  assignedDate: string;
  createdOn: string;
  dueDate: string;
  assignee: string;
  assigneeImg: string;
  assigneePho: number;
  lastReply: string | number;
  priority: string;
  status: string;
}
export interface ticket {
  id: number;
  ticket: number;
  subject: string;
  assigned: string;
  assignedPerson: string;
  assignedDate: string | number;
  createdOn: string | number;
  dueDate: string | number;
  assignee: string;
  assigneeImg: string;
  assigneePho: number;
  lastReply: string | number;
  priority: string;
  status: string;
}
export interface ticketsopen {
  id: number;
  ticketsopen: string | number;
  ticketId: number;
  subject: string;
  assigned: string;
  assignedPerson: string;
  assignedDate: string | number;
  createdOn: string | number;
  dueDate: string | number;
  assignee: string;
  assigneeImg: string;
  assigneePho: number;
  lastReply: string | number;
  priority: string;
  status: string;
}
export interface ticket {
  ticketId: number;
  subject: string;
  assigned: string;
  assignedPerson: string;
  assignedDate: string | number;
  createdOn: string | number;
  dueDate: string | number;
  assignee: string;
  assigneeImg: string;
  assigneePho: number;
  lastReply: string | number;
  priority: string;
  status: string;
}
export interface cancelled {
  ticketId: number;
  subject: string;
  assigned: string;
  assignedPerson: string;
  assignedDate: string | number;
  createdOn: string | number;
  dueDate: string | number;
  assignee: string;
  assigneeImg: string;
  assigneePho: number;
  lastReply: string | number;
  priority: string;
  status: string;
}
export interface testimonials {
  id: number;
  sNo: number;
  userName: string;
  img: string;
  email: string;
  content: string;
  createdOn: string | number;
  status: string;
}
export interface role {
  id: number;
  role: string;
  created: string | number;
}
export interface tax {
  id: number;
  date: string | number;
  economic_zone: string;
  tax: string;
  tax_rate: number;
  net: number;
  gross: number;
  amount: number;
}
export interface sales {
  id: string | number;
  date: number;
  category: string;
  sales: number;
  refunded: number;
  discounts: number;
  tax: number;
  amount: number;
}
export interface sales {
  id: string | number;
  date: number;
  category: string;
  sales: number;
  refunded: number;
  discounts: number;
  tax: number;
  amount: number;
}
export interface expense {
  category: string;
  customername: string;
  expensedate: string | number | Date;
  sNo: number;
  expenseId: string | number;
  reference: number;
  amount: number;
  img: string;
  paymentmode: string;
  notes: string;
  status: string;
}
export interface expensereport {
  sNo: number;
  companyName: string;
  mailId: string;
  amount: string;
  img: string;
  paymentStatus: string;
  category: string;
  createdDate: string;
}
export interface purchasereport {
  id: number;
  sNo: number;
  product: string;
  productImg: string;
  purchaseAmount: string;
  purchaseQty: string;
  instockQty: string;
}
export interface quotationReport {
  id: number;
  sNo: number;
  companyName: string;
  mailId: string;
  amount: string;
  img: string;
  paymentStatus: string;
  category: string;
  createdDate: string;
  duedate: string;
  serialNo: string;
}
export interface paymentreport {
  sNo: number;
  companyName: string;
  mailId: string;
  amount: string;
  amount2: string;
  amount3: string;
  img: string;
}
export interface purchasereport {
  sNo: number;
  product: string;
  productImg: string;
  purchaseAmount: string;
  purchaseQty: string;
  instockQty: string;
}
export interface purchasereturnreport {
  id: number;
  sNo: number;
  product: string;
  productImg: string;
  purchaseAmount: string;
  purchaseQty: string;
  instockQty: string;
  duedate: string;
}
export interface incomereport {
  sNo: number;
  companyName: string;
  duedate: string;
  mailId: string;
  amount: string;
  img: string;
  paymentMethod: string;
}
export interface stockreport {
  id: number;
  sNo: number;
  product: string;
  productImg: string;
  sku: string;
  category: string;
  soldAmount: string;
  soldQty: string;
  openQty: string;
  instockQty: string;
  duedate: string;
  closeQty: string;
}
export interface recurringinvoice {
  id: number;
  recurringinvoice: number;
  invoiceId: number;
  category: string;
  createdOn: string | number;
  invoicePerson: string;
  img: string;
  mailId: string;
  totalAmount: number;
  paidAmount: number;
  paymentmode: string;
  balance: number;
  dueDate: string | number;
  status: string;
  status1: string;
}
export interface draft {
  id: number;
  invoiceId: number;
  category: string;
  createdOn: string | number;
  invoicePerson: string;
  img: string;
  mailId: string;
  totalAmount: number;
  paidAmount: number;
  paymentmode: string;
  balance: number;
  dueDate: string | number;
  status: string;
}
export interface recurringcancelled {
  id?: number;
  invoiceId: number;
  category: string;
  createdOn: string | number;
  invoicePerson: string;
  img: string;
  mailId: string;
  totalAmount: number;
  paidAmount: number;
  paymentmode: string;
  balance: number;
  dueDate: string | number;
  status: string;
}
export interface quote {
  sNo: number;
  quotationId: number;
  name: string;
  pho: number;
  img: string;
  createdOn: string | number;
  status: string;
}
export interface editcreditnotes {
  sNo: number;
  editcreditnotes: number;
  product: number;
  quantity: number;
  unit: string;
  rate: number;
  discount: number;
  tax: number;
  amount: number;
}
export interface purchase {
  sNo: number;
  purchaseId: number;
  person: string;
  img: string;
  phone: number;
  totalAmount: number;
  paymentmode: string;
  date: string | number;
  status: string;
}
export interface units {
  id: number;
  unit: string;
  short: string;
}
export interface productlist {
  id: number;
  item: string;
  code: string | number;
  category: string;
  units: string;
  quantity: number;
  sales: number;
  purchase: number;
  img: string;
  sellingPrice: string;
  purchasePrice: string;
}
export interface category {
  sNo: number;
  date: string | number;
  img2: string;
  added: string;
  id: number;
  category: string;
  img: string;
  total: number;
  value: string;
}
export interface payments {
  id: number;
  name: string;
  email: string;
  img: string;
  paymentId: number;
  amount: number;
  date: number | string;
  paymentMethod: string;
  status: string;
}
export interface paymentsummary {
  id: number;
  transaction: number;
  invoice: number;
  name: string;
  phone: number;
  img: string;
  amount: string;
  date: number | string;
  paymentMethod: string;
}
export interface AddPages {
  sNo: number;
  pages: string;
  slug: string;
  value: string;
}
export interface transaction {
  sNo: number;
  type: string;
  amount: string;
  date: string;
  paymentType: string;
  status: string;
}
export interface subscribers {
  id: number;
  name: string;
  email: string;
  img: string;
  subscription: string;
  amount: number;
  duration: string;
  startdate: string | number;
  enddate: string | number;
}
export interface user {
  id: number;
  name: string;
  email: string;
  img: string;
  phone: number;
  role: number;
  activity: number | string;
  created: number | string;
  status: string;
}
export interface states {
  sNo: number;
  countryCode: string;
  countryName: string;
  countryFlag: string;
  stateName: string;
}
export interface countries {
  sNo: number;
  countryCode: string;
  countryName: number;
  countryId: string;
  countryFlag: string;
}
export interface cities {
  sNo: number;
  countryName: string;
  countryFlag: string;
  stateName: string;
  cityName: string;
}
export interface ledger {
  id: number;
  ledger: number;
  name: number;
  img: string;
  pho: number;
  reference: number;
  created: string | number;
  mode: string;
}
export interface itemList {
  item: number;
  price: number;
  discount: number;
  description: string;
  date: number | string;
}
export interface InvoicesRecurring {
  id?: number;
  invoiceId: number;
  invoice: number;
  category: string;
  created: string | number;
  name: string;
  email: string;
  img: string;
  total: number;
  paid: number;
  payment: string;
  balance: number;
  due: number | string;
  status: string;
}
export interface invoicepaid {
  sNo: number;
  invoiceId: number;
  invoice: number;
  category: string;
  created: string | number;
  name: string;
  email: string;
  img: string;
  total: number;
  paid: number;
  payment: string;
  balance: number;
  due: number | string;
  status: string;
}
export interface invoiceoverdue {
  sNo: number;
  invoiceId: number;
  invoice: number;
  name: string;
  email: string;
  img: string;
  amount: number;
  created: number | string;
  last: number | string;
  status: number | string;
  category: string;
  total: string;
  paid: string;
  payment: string;
  balance: string;
  due: string;
}
export interface InvoicesDraft {
  invoiceId: number;
  invoice: number;
  name: string;
  email: string;
  img: string;
  amount: number;
  created: number | string;
  last: number | string;
  status: number | string;
  category: string;
  total: string;
  paid: string;
  payment: string;
  balance: string;
  due: string;
}
export interface invoicecancelled {
  invoiceId: number;
  invoice: number;
  name: string;
  email: string;
  img: string;
  amount: number;
  created: number | string;
  cancel: number | string;
  status: string;
  category: string;
  total: string;
  paid: string;
  payment: number;
  balance: string;
  due: string;
}
export interface invoice {
  sNo: number;
  id: number;
  invoiceId: number;
  category: string;
  createdOn: string;
  invoiceTo: string;
  phnNumber: string;
  total: string;
  paid: string;
  paymentMode: string;
  balance: string;
  dueDate: string;
  status: string;
  img: string;
}
export interface inventory {
  sNo: number;
  item: string;
  code: string | number;
  units: string | number;
  quantity: number;
  sales: number;
  purchase: number;
}
export interface faq {
  sNo: number;
  title: string;
  category: string | number;
  details: string;
}
export interface signature {
  id: number;
  signaturename: string;
  signature: string;
}
export interface invoiceone {
  id: number;
  invoicetitle: string;
}
export interface estimates {
  id: number;
  number: string | number;
  customer_name: string;
  customer_img: string;
  estimate_date: string | number;
  expiry_date: string | number;
  amount: number;
  status: string;
}
export interface deliverychallans {
  sNo: number;
  challenId: number;
  customer: string;
  img: string;
  customerNumber: number;
  amount: number;
  createdOn: number | string;
}
export interface deleteaccount {
  sNo: number;
  person: string;
  email: string;
  img: string;
  requisition: string | number;
  delete: string | number;
}
export interface debitnotes {
  sNo: number;
  debitId: number;
  person: string;
  img: string;
  phone: number;
  totalAmount: number;
  paymentmode: string;
  date: number | string;
  status: string;
}
export interface deactivecustomer {
  sNo: number;
  id: number;
  img: string;
  name: string;
  email: string;
  phone: number;
  balance: number;
  invoice: number;
  created: string | number;
  status: string;
}
export interface activecustomer {
  sNo: number;
  id: number;
  img: string;
  name: string;
  email: string;
  phone: number;
  balance: number;
  invoice: number;
  created: number | string;
  status: string;
}
export interface creditnotes {
  sNo: number;
  customerId: number;
  customer: string;
  img: string;
  mailId: string;
  amount: number;
  paymentmode: string;
  createdOn: number | string;
  status: string;
  phno: number;
}
export interface creditnotesrecurring {
  sNo: number;
  customerId: number;
  customer: string;
  img: string;
  mailId: string;
  amount: number;
  paymentmode: string;
  createdOn: number | string;
  status: string;
}
export interface creditnotespending {
  sNo: number;
  customerId: number;
  customer: string;
  img: string;
  mailId: string;
  amount: number;
  paymentmode: string;
  createdOn: number | string;
  status: string;
}
export interface creditnotesoverdue {
  sNo: number;
  customerId: number;
  customer: string;
  img: string;
  mailId: string;
  amount: number;
  paymentmode: string;
  createdOn: number | string;
  status: string;
}
export interface creditnotesdraft {
  sNo: number;
  customerId: number;
  customer: string;
  img: string;
  mailId: string;
  amount: number;
  paymentmode: string;
  createdOn: number | string;
  status: string;
}
export interface creditnotescancel {
  sNo: number;
  customerId: number;
  customer: string;
  img: string;
  mailId: string;
  amount: number;
  paymentmode: string;
  createdOn: number | string;
  status: string;
}
export interface messages {
  sNo: number;
  name: string;
  img: string;
  email: string;
  mobileNumber: number;
  message: string;
  createdOn: number | string;
}
export interface blogcomments {
  sNo: number;
  name: string;
  phone: number;
  img: string;
  mail: string;
  content: string;
  date: string | number;
}
export interface allBlogs {
  id: number;
  imgs: string;
  date1: number;
  month: string;
  img2: string;
  names: string;
  date: string | number;
  para: string;
  para2: string;
  status: boolean;
}

export interface subMenus {
  url: string;
  separateRoute: boolean;
  menuValue: string;
  tittle: string;
  icon: string;
  showAsTab: boolean;
  showSubRoute: boolean;
  title: string;
  route?: string;
  base?: string;
  MenuItem: string;
}
export interface mainMenus {
  menu: MenuItem[];
  separateRoute: boolean;
  menuValue: string;
  tittle: string;
  route: string;
  base: string;
  icon: string;
  showAsTab: boolean;
  active: boolean;
  showSubRoute: boolean;
  url: string;
}
export interface mainMenu {
  menu: MenuItem[];
  separateRoute: boolean;
  menuValue: string;
  tittle: string;
  route: string;
  base: string;
  icon: string;
  showAsTab: boolean;
  url: string;
}
export interface Menu {
  menuValue: string;
  showSubRoute: boolean;
  route: string;
  hasSubRoute: boolean;
  icon: string;
  base: string;
  url: string;
}
export interface MenuItem {
  menuValue: string;
  showSubRoute: boolean;
  route: string;
  hasSubRoute: boolean;
  icon: string;
  base: string;
  url: string;
}

export interface SideBarData {
  tittle: string;
  active: boolean;
  icon: string;
  showAsTab: boolean;
  separateRoute: boolean;
  menu: MenuItem[];
  menuValue: string;
  menuValue1?: string;
  showSubRoute: boolean;
  route: string;
  hasSubRoute: boolean;
  base: string;
  subMenus: subMenus[];
  Mainmenu: mainMenu[];
  url: string;
}
export interface url {
  url: string;
}
export interface RouterObject {
  id?: number;
  url: string;
  type?: number;
}
export interface ticketsresolved {
  id: number;
  ticketsresolved: string | number;
  ticketId: number;
  subject: string;
  assigned: string;
  assignedPerson: string;
  assignedDate: string | number;
  createdOn: string | number;
  dueDate: string | number;
  assignee: string;
  assigneeImg: string;
  assigneePho: number;
  lastReply: string | number;
  priority: string;
  status: string;
}
export interface ticketsclosed {
  id: number;
  ticketsclosed: number;
  ticketsresolved: string | number;
  ticketId: number;
  subject: string;
  assigned: string;
  assignedPerson: string;
  assignedDate: string | number;
  createdOn: string | number;
  dueDate: string | number;
  assignee: string;
  assigneeImg: string;
  assigneePho: number;
  lastReply: string | number;
  priority: string;
  status: string;
}
export interface bankaccount {
  sNo: number;
  name: string;
  bankName: string;
  branch: string;
  accountNumber: number | string;
  ifscCode: number | string;
}
export interface companies {
  id: number;
  name: string;
  email: string;
  accountURL: string;
  plan: string;
  changePlan: string;
  createdDate: string;
  status: string;
  img: string;
}
export interface purchasereport {
  sNo: number;
  product: string;
  productImg: string;
  purchaseAmount: string;
  purchaseQty: string;
  instockQty: string;
}
export interface expensereport {
  sNo: number;
  companyName: string;
  mailId: string;
  amount: string;
  img: string;
  paymentStatus: string;
  category: string;
  createdDate: string;
}

export interface subscription {
  id: number;
  subscriber: string;
  plan: string;
  billingCycle: string;
  paymentGateway: string;
  amount: string;
  registeredOn: string;
  expiringOn: string;
  status: string;
  invoice: string;
  img: string;
}
export interface domainRequest {
  id: number;
  customer: string;
  email: string;
  domain: string;
  noOfEmployees: string;
  package1: string;
  package2: string;
  createdOn: string;
  status: string;
}
export interface domain {
  id: number;
  name: string;
  domainUrl: string;
  plan: string;
  planDuration: string;
  registeredOn: string;
  status: string;
  img: string;
}
export interface purchaseTransaction {
  id: number;
  customer: string;
  email: string;
  createdOn: string;
  amount: string;
  status: string;
  mode: string;
  invoiceNo: string;
}
export interface taxPurchase {
  id: number;
  supplier: string;
  date: string;
  refNo: string;
  totalAmount: string;
  paymentMethod: string;
  discount: string;
  taxAmount: string;
  img: string;
  customer: string;
  invoiceNo: string;
}
export interface salesreturnreport {
  id: number;
  companyName: string;
  mailId: string;
  amount: string;
  img: string;
  paymentStatus: string;
  category: string;
  createdDate: string;
}
export interface salesreport {
  id: number;
  sNo: number;
  product: string;
  productImg: string;
  sku: string;
  category: string;
  soldAmount: string;
  soldQty: string;
  instockQty: string;
  dueDate: string;
}
export interface salesreturnreport {
  sNo: number;
  product: string;
  productImg: string;
  sku: string;
  category: string;
  soldAmount: string;
  soldQty: string;
  instockQty: string;
  dueDate: string;
}
export interface url {
  url: string;
}
export interface planBillingOwl {
  name: string;
  remainingDays: string;
  price: string;
  billingPeriod: string;
  text: string;
  img: string;
  customClass?: boolean;
}
export interface planBilling {
  id: number;
  date: string;
  details1: string;
  details2: string;
  status: string;
}
export interface customField {
  id: number;
  modules: string;
  label: string;
  type: string;
  defaultValue: string;
  required: string;
}
export interface inventoryHistory {
  sNo: number;
  id: number;
  item: string;
  code: string;
  units: string;
  quantity: string;
  sellingPrice: string;
  purchasePrice: string;
}
export interface SideBar {
  showMyTab?: boolean;
  tittle: string;
  icon: string;
  showAsTab: boolean;
  separateRoute: boolean;
  materialicons?: string;
  menu: SideBarMenu[];
}
export interface SideBarMenu {
  showMyTab?: boolean;
  menuValue: string;
  menuValue1?: string;
  route?: string;
  hasSubRoute: boolean;
  showSubRoute: boolean;
  icon: string;
  base: string;
  materialicons: string;
  subMenus: SubMenu[];
}
export interface SubMenu {
  menuValue: string;
  menuValue1?: string;
  route?: string;
  base: string;
  base2?: string;
  base3?: string;
  base4?: string;
  base5?: string;
  base6?: string;
  base7?: string;
  base8?: string;
}
export interface dataTables {
  id: number;
  name: string;
  position: string;
  office: string;
  age: string;
  startDate: string;
  salary: string;
}
export interface userList {
  id: number;
  img: string;
  name: string;
  email: string;
  phone: string;
  balance: string;
  invoice: string;
  created: string;
  status: string;
  role?: string;
  registered_on?: string;
}
export interface plansList {
  id: number;
  planName: string;
  planType: string;
  price: string;
  users: string;
  suppliers: string;
  products: string;
  invoice: string;
  createdDate: string;
  status: string;
}
