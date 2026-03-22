 
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { routes } from '../../core.index';
import { SideBar, SideBarData, SideBarMenu, apiResultFormat } from '../../models/models';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  public getEvents() {
    return this.http
      .get<apiResultFormat>('assets/JSON/scheduleevents.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }

  public getCustomers() {
    return this.http.get<apiResultFormat>('assets/JSON/customers.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getActive() {
    return this.http
      .get<apiResultFormat>('assets/JSON/activecustomer.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getDeactive() {
    return this.http
      .get<apiResultFormat>('assets/JSON/deactivecustomer.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }

  public getBlogs() {
    return this.http.get<apiResultFormat>('assets/JSON/blogs.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }

  public getCategories() {
    return this.http.get<apiResultFormat>('assets/JSON/categories.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }

  public getSalesReport() {
    return this.http.get<apiResultFormat>('assets/JSON/salesReport.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getstockReport() {
    return this.http.get<apiResultFormat>('assets/JSON/stock-report.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getincomeReport() {
    return this.http
      .get<apiResultFormat>('assets/JSON/income-report.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getTaxReport() {
    return this.http.get<apiResultFormat>('assets/JSON/tax.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getExpensesList() {
    return this.http.get<apiResultFormat>('assets/JSON/expenses.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getPaymentList() {
    return this.http.get<apiResultFormat>('assets/JSON/payments.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getInvoiceItem() {
    return this.http.get<apiResultFormat>('assets/JSON/itemList.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }

  public getEstimatesList() {
    return this.http.get<apiResultFormat>('assets/JSON/estimates.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }

  public getTicketList() {
    return this.http.get<apiResultFormat>('assets/JSON/ticket.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getTicketopenList() {
    return this.http.get<apiResultFormat>('assets/JSON/ticket.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getTicketPending() {
    return this.http
      .get<apiResultFormat>('assets/JSON/ticketsPending.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getTicketOpen() {
    return this.http.get<apiResultFormat>('assets/JSON/ticketsopen.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getTicketresolved() {
    return this.http
      .get<apiResultFormat>('assets/JSON/ticketsresolved.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getTicketOverdue() {
    return this.http
      .get<apiResultFormat>('assets/JSON/ticketsOverdue.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getTicketclosed() {
    return this.http.get<apiResultFormat>('assets/JSON/ticketclosed.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getTicketCancelled() {
    return this.http
      .get<apiResultFormat>('assets/JSON/ticketCancelled.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getTicketRecurring() {
    return this.http
      .get<apiResultFormat>('assets/JSON/ticketrecurring.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getCountries() {
    return this.http.get<apiResultFormat>('assets/JSON/countries.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getbankaccount() {
    return this.http.get<apiResultFormat>('assets/JSON/bankaccount.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getCities() {
    return this.http.get<apiResultFormat>('assets/JSON/city.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getDeliverychallan() {
    return this.http
      .get<apiResultFormat>('assets/JSON/deliverychallens.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getMessages() {
    return this.http.get<apiResultFormat>('assets/JSON/message.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getFaq() {
    return this.http.get<apiResultFormat>('assets/JSON/faq.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getTestimonials() {
    return this.http.get<apiResultFormat>('assets/JSON/testimonials.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getVendors() {
    return this.http.get<apiResultFormat>('assets/JSON/vendors.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getLedger() {
    return this.http.get<apiResultFormat>('assets/JSON/ledger.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public recurringinvoice() {
    return this.http
      .get<apiResultFormat>('assets/JSON/recurringinvoice.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public recurringPending() {
    return this.http
      .get<apiResultFormat>('assets/JSON/recurringpending.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public recurringOverdue() {
    return this.http
      .get<apiResultFormat>('assets/JSON/recurringoverdue.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public recurring() {
    return this.http.get<apiResultFormat>('assets/JSON/recurring.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public recurringCancelled() {
    return this.http
      .get<apiResultFormat>('assets/JSON/recurringcancelled.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public recurringDraft() {
    return this.http
      .get<apiResultFormat>('assets/JSON/recurringdraft.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getUnits() {
    return this.http.get<apiResultFormat>('assets/JSON/units.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getCategory() {
    return this.http.get<apiResultFormat>('assets/JSON/category.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getProductlist() {
    return this.http.get<apiResultFormat>('assets/JSON/productlist.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getcreditnotes() {
    return this.http.get<apiResultFormat>('assets/JSON/creditnotes.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getEditcreditnotes() {
    return this.http
      .get<apiResultFormat>('assets/JSON/editcreditnotes.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getCreditnotespending() {
    return this.http
      .get<apiResultFormat>('assets/JSON/creditnotespending.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getCreditnotesoverdue() {
    return this.http
      .get<apiResultFormat>('assets/JSON/creditnotesoverdue.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getCreditnotesdraft() {
    return this.http
      .get<apiResultFormat>('assets/JSON/creditnotesdraft.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getCreditnoterecurring() {
    return this.http
      .get<apiResultFormat>('assets/JSON/creditnotesrecurring.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getCreditnotecancel() {
    return this.http
      .get<apiResultFormat>('assets/JSON/creditnotescancel.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getinvoice() {
    return this.http.get<apiResultFormat>('assets/JSON/invoice.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getinvoicepaid() {
    return this.http.get<apiResultFormat>('assets/JSON/invoicepaid.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getinvoiceoverdue() {
    return this.http
      .get<apiResultFormat>('assets/JSON/invoiceoverdue.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public quotationReport() {
    return this.http
      .get<apiResultFormat>('assets/JSON/quotation-report.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public paymentReport() {
    return this.http
      .get<apiResultFormat>('assets/JSON/payment-report.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getinvoicedraft() {
    return this.http.get<apiResultFormat>('assets/JSON/invoicedraft.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getinvoicerecurring() {
    return this.http
      .get<apiResultFormat>('assets/JSON/invoicerecurring.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getinvoicecancelled() {
    return this.http
      .get<apiResultFormat>('assets/JSON/invoicecancelled.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getinventory() {
    return this.http.get<apiResultFormat>('assets/JSON/inventory.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getpurchase() {
    return this.http.get<apiResultFormat>('assets/JSON/purchase.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getpurchaseorder() {
    return this.http
      .get<apiResultFormat>('assets/JSON/purchaseorder.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getdebitnotes() {
    return this.http.get<apiResultFormat>('assets/JSON/debitnotes.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getquotation() {
    return this.http.get<apiResultFormat>('assets/JSON/quotations.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getpaymentsummary() {
    return this.http
      .get<apiResultFormat>('assets/JSON/paymentsummary.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getSubscribers() {
    return this.http.get<apiResultFormat>('assets/JSON/subscribers.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getTransaction() {
    return this.http.get<apiResultFormat>('assets/JSON/transactions.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getrole() {
    return this.http.get<apiResultFormat>('assets/JSON/role.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getdeleteaccount() {
    return this.http
      .get<apiResultFormat>('assets/JSON/deleteaccount.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getUsers() {
    return this.http.get<apiResultFormat>('assets/JSON/user.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getaddpages() {
    return this.http.get<apiResultFormat>('assets/JSON/addpages.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getstates() {
    return this.http.get<apiResultFormat>('assets/JSON/states.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getblogcomments() {
    return this.http.get<apiResultFormat>('assets/JSON/blogcomments.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getsignature() {
    return this.http.get<apiResultFormat>('assets/JSON/signature.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getinvoiceone() {
    return this.http.get<apiResultFormat>('assets/JSON/invoiceone.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getCompanies() {
    return this.http.get<apiResultFormat>('assets/JSON/companies.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getPurchaseReport() {
    return this.http
      .get<apiResultFormat>('assets/JSON/purchase-report.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getPurchaseReturnReport() {
    return this.http
      .get<apiResultFormat>('assets/JSON/purchasereturn-report.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }

  public getExpense() {
    return this.http
      .get<apiResultFormat>('assets/JSON/expense-report.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getSubscription() {
    return this.http.get<apiResultFormat>('assets/JSON/subscription.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getSalesReports() {
    return this.http.get<apiResultFormat>('assets/JSON/sales-report.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getDomainRequest() {
    return this.http
      .get<apiResultFormat>('assets/JSON/domain-request.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getDomain() {
    return this.http.get<apiResultFormat>('assets/JSON/domain.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getPurchaseTransaction() {
    return this.http
      .get<apiResultFormat>('assets/JSON/purchase-transaction.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getTaxPurchase() {
    return this.http.get<apiResultFormat>('assets/JSON/tax-purchase.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getTaxPurchase2() {
    return this.http.get<apiResultFormat>('assets/JSON/tax-purchase2.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getSalesReturnReports() {
    return this.http
      .get<apiResultFormat>('assets/JSON/salesreturn-report.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getPlanBilling() {
    return this.http
      .get<apiResultFormat>('assets/JSON/plan-billing.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getCustomField() {
    return this.http
      .get<apiResultFormat>('assets/JSON/custom-field.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getInventoryHistory() {
    return this.http
      .get<apiResultFormat>('assets/JSON/inventory-history.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getDataTables() {
    return this.http
      .get<apiResultFormat>('assets/JSON/data-tables.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getPlansList() {
    return this.http
      .get<apiResultFormat>('assets/JSON/plans-list.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
   
// eslint-disable-next-line @typescript-eslint/no-explicit-any
public sideBar: any[] = [
  {
    tittle: 'Main',
    active: false,
    icon: 'airplay',
    showAsTab: false,
    separateRoute: false,
    menu: [
      {
        menuValue: 'Dashboard',
        route: routes.dashboard,
        hasSubRoute: true,
        showSubRoute: false,
        icon: 'home',
        base: 'dashboard',
        subMenus: [
          {
            separateRoute: true,
            menuValue: 'Admin Dashboard',
            tittle: 'Admin Dashboard',
            route: routes.dashboard,
            base: routes.dashboard,
            icon: 'home',
            showAsTab: false,
          },
        ],
      },
      {
        menuValue: 'Applications',
        route: routes.application,
        hasSubRoute: true,
        showSubRoute: false,
        icon: 'grid',
        base: 'application',
        subMenus: [
          {
            separateRoute: true,
            menuValue: 'Chat',
            tittle: 'Chat',
            route: routes.chat,
            base: routes.chat,
            icon: 'message-square',
            showAsTab: false,
          },
          {
            separateRoute: true,
            menuValue: 'Calendar',
            tittle: 'Calendar',
            route: routes.calender,
            base: routes.calender,
            icon: 'calendar',
            showAsTab: false,
          },
          {
            separateRoute: true,
            menuValue: 'Email',
            tittle: 'Email',
            route: routes.email,
            base: routes.email,
            icon: 'mail',
            showAsTab: false,
          },
        ],
      },
      {
        menuValue: 'Super Admin',
        route: routes.application,
        hasSubRoute: true,
        showSubRoute: false,
        icon: 'user',
        base: 'super-admin',
        subMenus: [
          {
            separateRoute: true,
            menuValue: 'Dashboard',
            route: routes.superAdminDashboard,
            base: routes.superAdminDashboard,
            showAsTab: false,
          },
          {
            separateRoute: true,
            menuValue: 'Companies',
            route: routes.companies,
            base: routes.companies,
            showAsTab: false,
          },
          {
            separateRoute: true,
            menuValue: 'Subscription',
            route: routes.subscription,
            base: routes.subscription,
            showAsTab: false,
          },
          {
            separateRoute: true,
            menuValue: 'Packages',
            route: routes.packages,
            base: routes.packages,
            showAsTab: false,
          },
          {
            separateRoute: true,
            menuValue: 'Domain',
            route: routes.domain,
            base: routes.domain,
            showAsTab: false,
          },
          {
            separateRoute: true,
            menuValue: 'Purchase Transaction',
            route: routes.purchaseTransaction,
            base: routes.purchaseTransaction,
            showAsTab: false,
          },
        ],
      },
      {
        menuValue: 'Customer',
        route: routes.customer,
        view:false,
        hasSubRoute: true,
        showSubRoute: false,
        icon: 'users',
        base: 'customers',
        subMenus: [
          {
            separateRoute: true,
            menuValue: 'Customers',
            tittle: 'Customers',
            route: routes.customer,
            base: 'customer',
            icon: 'users',
            showAsTab: false,
          },
          {
            separateRoute: true,
            menuValue: 'Customer Details',
            tittle: 'Customer Details',
            route: routes.customerdetails,
            base: 'customerdetailspage',
            icon: 'file',
            showAsTab: false,
          },
          {
            separateRoute: true,
            menuValue: 'Vendors',
            tittle: 'Vendors',
            route: routes.vendorsList,
            base: 'vendors',
            icon: 'users',
            showAsTab: false,
          },
        ],
      },
    ],
  },
  {
    tittle: 'Customers',
    active: false,
    icon: '',
    showAsTab: false,
    separateRoute: false,
    menu: [
      {
        menuValue: 'Customers',
        route: routes.customer,
        hasSubRoute: false,
        showSubRoute: false,
        icon: 'users',
        base: 'customer',
        subMenus: [],
      },
      {
        menuValue: 'Customer Details',
        route: routes.customerdetails,
        hasSubRoute: false,
        showSubRoute: false,
        icon: 'file',
        base: 'customerdetailspage',
        subMenus: [],
      },
      {
        menuValue: 'Vendors',
        route: routes.vendorsList,
        hasSubRoute: false,
        showSubRoute: false,
        icon: 'users',
        base: 'vendors',
        subMenus: [],
      },
    ],
  },
  {
    tittle: 'Inventory',
    active: false,
    icon: 'airplay',
    showAsTab: false,
    separateRoute: false,
    menu: [
      {
        menuValue: 'Products / Services',
        hasSubRoute: true,
        showSubRoute: false,
        icon: 'package',
        base: 'product-service',
        subMenus: [
          {
            menuValue: 'Product List',
            route: routes.productlist,
            base: routes.productlist,
          },
          {
            menuValue: 'Category',
            route: routes.category,
            base: routes.category,
          },
          {
            menuValue: 'Units',
            route: routes.units,
            base: routes.units,
          },
        ],
      },
      {
        menuValue: 'Inventory',
        route: routes.allInventory,
        hasSubRoute: false,
        showSubRoute: false,
        icon: 'users',
        base: 'inventory',
        subMenus: [],
      },
      {
        menuValue: 'Signature',
        route: routes.signaturelist,
        view:false,
        hasSubRoute: true,
        showSubRoute: false,
        icon: 'file-plus',
        base: 'signature-list',
        subMenus: [
          {
            separateRoute: true,
            menuValue: 'List of Signature',
            tittle: 'List of Signature',
            route: routes.signaturelist,
            base: routes.signaturelist,
            icon: 'clipboard',
            showAsTab: false,
          },
          {
            separateRoute: true,
            menuValue: 'Signature Invoice',
            tittle: 'Signature Invoice',
            route: routes.signatureinvoice,
            base: routes.signatureinvoice,
            icon: 'box',
            showAsTab: false,
          },
        ],
      },
    ],
  },
  {
    tittle: 'Signature',
    active: false,
    icon: 'airplay',
    showAsTab: false,
    separateRoute: false,
    menu: [
      {
        menuValue: 'List of Signature',
        route: routes.signaturelist,
        hasSubRoute: false,
        showSubRoute: false,
        icon: 'clipboard',
        base: 'signature-list',
        subMenus: [],
      },
      {
        menuValue: 'Signature Invoice',
        route: routes.signatureinvoice,
        hasSubRoute: false,
        showSubRoute: false,
        icon: 'box',
        base: 'signature-invoice',
        subMenus: [],
      },
    ],
  },
  {
    tittle: 'Sales',
    active: false,
    icon: 'airplay',
    showAsTab: false,
    separateRoute: false,
    menu: [
      {
        menuValue: 'Invoices',
        route: routes.dashboard,
        hasSubRoute: true,
        showSubRoute: false,
        icon: 'clipboard',
        base: 'invoices',
        subMenus: [
          {
            menuValue: 'Invoices List',
            route: routes.invoiceList,
            base: routes.invoiceList,
          },

          {
            menuValue: 'Invoice Details (Admin)',
            route: routes.invoicedetailsadmin,
            base: routes.invoicedetailsadmin,
          },
          {
            menuValue: 'Invoice Details (Customer)',
            route: routes.invoicedetails,
            base: routes.invoicedetails,
          },
          {
            menuValue: 'Invoices Template',
            route: routes.invoicetemplate,
            base: routes.invoicetemplate,
          },
        ],
      },
      {
        menuValue: 'Recurring Invoices',
        route: routes.recurringinvoices,
        hasSubRoute: false,
        showSubRoute: false,
        icon: 'clipboard',
        base: 'recurring-pages',
        subMenus: [],
      },
      {
        menuValue: 'Credit Notes',
        route: routes.creditnotes,
        hasSubRoute: false,
        showSubRoute: false,
        icon: 'edit',
        base: 'credit-note-pages',
        subMenus: [],
      },
    ],
  },

  {
    tittle: 'Purchases',
    active: false,
    icon: 'airplay',
    showAsTab: false,
    separateRoute: false,
    menu: [
      {
        menuValue: 'Purchases',
        route: routes.purchase,
        hasSubRoute: false,
        showSubRoute: false,
        icon: 'shopping-cart',
        base: 'purchasepage',
        subMenus: [],
      },
      {
        menuValue: 'Purchase Orders',
        route: routes.purchaseorders,
        hasSubRoute: false,
        showSubRoute: false,
        icon: 'shopping-bag',
        base: 'purchase-orders',
        subMenus: [],
      },
      {
        menuValue: 'Debit Notes',
        route: routes.debitnotes,
        hasSubRoute: false,
        showSubRoute: false,
        icon: 'file-text',
        base: 'debit-notes',
        subMenus: [],
      },
    ],
  },
  {
    tittle: 'Finance & Accounts',
    active: false,
    icon: 'airplay',
    showAsTab: false,
    separateRoute: false,
    menu: [
      {
        menuValue: 'Expenses',
        route: routes.expensesList,
        hasSubRoute: false,
        showSubRoute: false,
        icon: 'file-plus',
        base: 'expenses',
        subMenus: [],
      },
      {
        menuValue: 'Payments',
        route: routes.paymentsList,
        hasSubRoute: false,
        showSubRoute: false,
        icon: 'credit-card',
        base: 'payments',
        subMenus: [],
      },
    ],
  },
  {
    tittle: 'Quotations',
    active: false,
    icon: 'airplay',
    showAsTab: false,
    separateRoute: false,
    menu: [
      {
        menuValue: 'Quotations',
        route: routes.quotations,
        hasSubRoute: false,
        showSubRoute: false,
        icon: 'clipboard',
        base: 'quotationspage',
        subMenus: [],
      },
      {
        menuValue: 'Delivery Challans',
        route: routes.deliveryChallansList,
        hasSubRoute: false,
        showSubRoute: false,
        icon: 'file-text',
        base: 'delivery-challans',
        subMenus: [],
      },
    ],
  },
  {
    tittle: 'Reports',
    active: false,
    icon: 'airplay',
    showAsTab: false,
    separateRoute: false,
    menu: [
      {
        menuValue: 'Payment Summary',
        route: routes.paymentsummary,
        hasSubRoute: false,
        showSubRoute: false,
        icon: 'credit-card',
        base: 'payment-summary',
        subMenus: [],
      },
      {
        menuValue: 'Reports',
        hasSubRoute: true,
        showSubRoute: false,
        icon: 'box',
        base: 'report',
        subMenus: [
          {
            menuValue: 'Expense Report',
            route: routes.expenseReport,
            base: routes.expenseReport,
          },

          {
            menuValue: 'Purchase Report',
            route: routes.purchaseReport,
            base: routes.purchaseReport,
          },
          {
            menuValue: 'Purchase Return Report',
            route: routes.purchaseReturnReport,
            base: routes.purchaseReturnReport,
          },
          {
            menuValue: 'Sales Report',
            route: routes.salesReport,
            base: routes.salesReport,
          },
          {
            menuValue: 'Sales Return Report',
            route: routes.salesReturnReport,
            base: routes.salesReturnReport,
          },
          {
            menuValue: 'Quotation Report',
            route: routes.quotationReport,
            base: routes.quotationReport,
          },
          {
            menuValue: 'Payment Report',
            route: routes.paymentReport,
            base: routes.paymentReport,
          },
          {
            menuValue: 'Stock Report',
            route: routes.stockReport,
            base: routes.stockReport,
          },
          {
            menuValue: 'Low Stock Report',
            route: routes.lowStockReport,
            base: routes.lowStockReport,
          },
          {
            menuValue: 'Income Report',
            route: routes.incomeReport,
            base: routes.incomeReport,
          },
          {
            menuValue: 'Tax Report',
            route: routes.taxPurchase,
            base: routes.taxPurchase,
          },
          {
            menuValue: 'Profit & Loss',
            route: routes.profitLoss,
            base: routes.profitLoss,
          },
        ],
      },
    ],
  },
  {
    tittle: 'User Management',
    active: false,
    icon: 'airplay',
    showAsTab: false,
    separateRoute: false,
    menu: [
      {
        menuValue: 'Users',
        route: routes.users,
        hasSubRoute: false,
        showSubRoute: false,
        icon: 'user',
        base: 'manageusers',
        subMenus: [],
      },
      {
        menuValue: 'Roles & Permission',
        route: routes.rolespermission,
        hasSubRoute: false,
        showSubRoute: false,
        icon: 'clipboard',
        base: 'roles-permission',
        subMenus: [],
      },
      {
        menuValue: 'Delete Account Request',
        route: routes.deleteaccountrequest,
        hasSubRoute: false,
        showSubRoute: false,
        icon: 'trash-2',
        base: 'delete-account-request',
        subMenus: [],
      },
    ],
  },
  {
    tittle: 'Membership',
    active: false,
    icon: 'airplay',
    showAsTab: false,
    separateRoute: false,
    menu: [
      {
        menuValue: 'Membership',
        route: routes.membership,
        hasSubRoute: true,
        showSubRoute: false,
        icon: 'book',
        base: 'membership',
        subMenus: [
          {
            menuValue: 'Membership Plans',
            route: routes.membershipplans,
            base: routes.membershipplans,
          },
          {
            menuValue: 'Membership Addons',
            route: routes.membershipaddons,
            base: routes.membershipaddons,
          },
          {
            menuValue: 'Subscribers',
            route: routes.subscribers,
            base: routes.subscribers,
          },
          {
            menuValue: 'Transactions',
            route: routes.transactions,
            base: routes.transactions,
          },
        ],
      },
    ],
  },
  {
    tittle: 'Content (CMS)',
    active: false,
    icon: 'file',
    showAsTab: false,
    separateRoute: false,
    menu: [
      {
        menuValue: 'Pages',
        route: routes.pages,
        hasSubRoute: false,
        showSubRoute: false,
        icon: 'folder',
        base: 'pages',
        subMenus: [],
      },
      {
        menuValue: 'Blogs',
        route: routes.blogs,
        hasSubRoute: true,
        showSubRoute: false,
        icon: 'grid',
        base: 'blog',
        subMenus: [
          {
            menuValue: 'All Blogs',
            route: routes.allBlogs,
            base: routes.allBlogs,
          },
          {
            menuValue: 'Categories',
            route: routes.categories,
            base: routes.categories,
          },
          {
            menuValue: 'Blog comments',
            route: routes.blogcomments,
            base: routes.blogcomments,
          },
        ],
      },
      {
        menuValue: 'Location',
        route: routes.paymentsList,
        hasSubRoute: true,
        showSubRoute: false,
        icon: 'map-pin',
        base: 'location',
        subMenus: [
          {
            menuValue: 'Countries',
            route: routes.countries,
            base: routes.countries,
          },
          {
            menuValue: 'States',
            route: routes.states,
            base: routes.states,
          },
          {
            menuValue: 'Cities',
            route: routes.cities,
            base: routes.cities,
          },
        ],
      },
      {
        menuValue: 'Testimonials',
        route: routes.testimonials,
        hasSubRoute: false,
        showSubRoute: false,
        icon: 'message-square',
        base: 'testimonial-page',
        subMenus: [],
      },
      {
        menuValue: 'FAQ',
        route: routes.faq,
        hasSubRoute: false,
        showSubRoute: false,
        icon: 'alert-circle',
        base: 'faq',
        subMenus: [],
      },
    ],
  },
  {
    tittle: 'Support',
    active: false,
    icon: 'airplay',
    showAsTab: false,
    separateRoute: false,
    menu: [
      {
        menuValue: 'Contact Messages',
        route: routes.contactmessages,
        hasSubRoute: false,
        showSubRoute: false,
        icon: 'printer',
        base: 'contact-messages',
        subMenus: [],
      },
      {
        menuValue: 'Tickets',
        route: routes.tickets,
        hasSubRoute: true,
        showSubRoute: false,
        icon: 'save',
        base: 'tickets',
        subMenus: [
          {
            menuValue: 'Tickets',
            route: routes.tickets,
            base: routes.tickets,
          },
          {
            menuValue: 'Tickets List',
            route: routes.ticketslist,
            base: routes.ticketslist,
          },
          {
            menuValue: 'Tickets Kanban',
            route: routes.ticketskanban,
            base: routes.ticketskanban,
          },
          {
            menuValue: 'Ticket Overview',
            route: routes.ticketdetails,
            base: routes.ticketdetails,
          },
        ],
      },
    ],
  },

  {
    tittle: 'Pages',
    active: false,
    icon: 'file',
    showAsTab: false,
    separateRoute: false,
    menu: [
      {
        menuValue: 'Profile',
        route: routes.profile,
        hasSubRoute: false,
        showSubRoute: false,
        icon: 'user-plus',
        base: 'profile',
        subMenus: [],
      },
      {
        menuValue: 'Authentication',
        route: routes.dashboard,
        hasSubRoute: true,
        showSubRoute: false,
        icon: 'lock',
        base: '',
        subMenus: [
          { menuValue: 'Login', route: routes.login, base: routes.login },
          {
            menuValue: 'Register',
            route: routes.register,
            base: routes.register,
          },
          {
            menuValue: 'Forgot Password',
            route: routes.forgot_password,
            base: routes.forgot_password,
          },
          {
            menuValue: 'Lock Screen',
            route: routes.lock_screen,
            base: routes.lock_screen,
          },
        ],
      },

      {
        menuValue: 'Error Pages',
        route: routes.errorPage404,
        hasSubRoute: false,
        showSubRoute: false,
        icon: 'alert-octagon',
        base: '1',
      },
      {
        menuValue: 'Blank Page',
        route: routes.blankPage,
        hasSubRoute: false,
        showSubRoute: false,
        icon: 'file',
        base: 'blank-page',
        subMenus: [],
      },
      {
        menuValue: 'Google Maps',
        route: routes.googleMaps,
        hasSubRoute: false,
        showSubRoute: false,
        icon: 'map-pin',
        base: 'google-maps',
        subMenus: [],
      },
    ],
  },
  {
    tittle: 'UI Interface',
    active: false,
    icon: 'layers',
    showAsTab: false,
    separateRoute: false,
    menu: [
      {
        menuValue: 'Base UI',
        route: routes.dashboard,
        hasSubRoute: true,
        showSubRoute: false,
        icon: 'shield',
        base: 'base-ui',
        subMenus: [
          {
            menuValue: 'Alerts',
            route: routes.alert,
            base: routes.alert,
          },
          {
            menuValue: 'Accordions',
            route: routes.accordions,
            base: routes.accordions,
          },
          { menuValue: 'Avatar', route: routes.avatar, base: routes.avatar },
          { menuValue: 'Badges', route: routes.badges, base: routes.badges },
          {
            menuValue: 'Buttons',
            route: routes.buttons,
            base: routes.buttons,
          },
          {
            menuValue: 'Button Group',
            route: routes.buttonGroup,
            base: routes.buttonGroup,
          },
          {
            menuValue: 'Breadcrumb',
            route: routes.breadcrumb,
            base: routes.breadcrumb,
          },
          { menuValue: 'Cards', route: routes.cards, base: routes.cards },
          {
            menuValue: 'Carousel',
            route: routes.carousel,
            base: routes.carousel,
          },
          {
            menuValue: 'Dropdowns',
            route: routes.dropDown,
            base: routes.dropDown,
          },
          { menuValue: 'Grid', route: routes.grid, base: routes.grid },
          { menuValue: 'Images', route: routes.images, base: routes.images },
          {
            menuValue: 'Lightbox',
            route: routes.lightBox,
            base: routes.lightBox,
          },
          { menuValue: 'Media', route: routes.media, base: routes.media },
          { menuValue: 'Modals', route: routes.modal, base: routes.modal },
          {
            menuValue: 'Offcanvas',
            route: routes.offcanvas,
            base: routes.offcanvas,
          },
          {
            menuValue: 'Pagination',
            route: routes.pagination,
            base: routes.pagination,
          },

          {
            menuValue: 'Progress Bars',
            route: routes.progressBars,
            base: routes.progressBars,
          },
          {
            menuValue: 'Placeholders',
            route: routes.placeholder,
            base: routes.placeholder,
          },
          
          {
            menuValue: 'Spinner',
            route: routes.spinner,
            base: routes.rangeSlider,
          },
          { menuValue: 'Tabs', route: routes.tabs, base: routes.tabs },
          { menuValue: 'Toasts', route: routes.toasts, base: routes.toasts },
          {
            menuValue: 'Tooltip',
            route: routes.tooltip,
            base: routes.tooltip,
          },
          {
            menuValue: 'Typography',
            route: routes.typography,
            base: routes.typography,
          },
          { menuValue: 'Videos', route: routes.video, base: routes.video },
        ],
      },
      {
        menuValue: 'Elements',
        route: routes.dashboard,
        hasSubRoute: true,
        showSubRoute: false,
        icon: 'box',
        base: 'elements',
        subMenus: [
          { menuValue: 'Ribbon', route: routes.ribbon, base: routes.ribbon },
          {
            menuValue: 'Clipboard',
            route: routes.clipboards,
            base: routes.clipboards,
          },
          {
            menuValue: 'Drag & Drop',
            route: routes.dragDrop,
            base: routes.dragDrop,
          },
          {
            menuValue: 'Rating',
            route: routes.rating,
            base: routes.rating,
          },
          {
            menuValue: 'Text Editor',
            route: routes.textEditor,
            base: routes.textEditor,
          },
          {
            menuValue: 'Counter',
            route: routes.counter,
            base: routes.counter,
          },
          {
            menuValue: 'Scrollbar',
            route: routes.scrollbar,
            base: routes.scrollbar,
          },
          {
            menuValue: 'Notification',
            route: routes.notification,
            base: routes.notification,
          },

          {
            menuValue: 'Timeline',
            route: routes.timeline,
            base: routes.timeline,
          },
          {
            menuValue: 'Horizontal Timeline',
            route: routes.horizontal,
            base: routes.horizontal,
          },
          {
            menuValue: 'Form Wizard',
            route: routes.formWizard,
            base: routes.formWizard,
          },
        ],
      },
      {
        menuValue: 'Charts',
        route: routes.dashboard,
        hasSubRoute: true,
        showSubRoute: false,
        icon: 'bar-chart-2',
        base: 'chart',
        subMenus: [
          {
            menuValue: 'Apex Charts',
            route: routes.apexChart,
            base: routes.apexChart,
          },
          {
            menuValue: 'Ng2 Charts',
            route: routes.ngTwoCharts,
            base: routes.ngTwoCharts,
          }
        ],
      },
      {
        menuValue: 'Icons',
        route: routes.dashboard,
        hasSubRoute: true,
        showSubRoute: false,
        icon: 'award',
        base: 'icon',
        subMenus: [
          {
            menuValue: 'Fontawesome Icons',
            route: routes.fontawesome,
            base: routes.fontawesome,
          },
          {
            menuValue: 'Feather Icons',
            route: routes.feather,
            base: routes.feather,
          },
          {
            menuValue: 'Ionic Icons',
            route: routes.ionic,
            base: routes.ionic,
          },
          {
            menuValue: 'Material Icons',
            route: routes.material,
            base: routes.material,
          },
          { menuValue: 'pe7 Icons', route: routes.pe7, base: routes.pe7 },
          {
            menuValue: 'Simpleline Icons',
            route: routes.simpleLine,
            base: routes.simpleLine,
          },
          {
            menuValue: 'Themify Icons',
            route: routes.themify,
            base: routes.themify,
          },
          {
            menuValue: 'Weather Icons',
            route: routes.weather,
            base: routes.weather,
          },
          {
            menuValue: 'Typicon Icons',
            route: routes.typicon,
            base: routes.typicon,
          },
          { menuValue: 'Flag Icons', route: routes.flag, base: routes.flag },
        ],
      },
      {
        menuValue: 'Forms',
        route: routes.dashboard,
        hasSubRoute: true,
        showSubRoute: false,
        icon: 'file-plus',
        base: 'forms',
        subMenus: [
          {
            menuValue: 'Basic Inputs',
            route: routes.basicForm,
            base: routes.basicForm,
          },
          {
            menuValue: 'Input Groups',
            route: routes.inputGroups,
            base: routes.inputGroups,
          },
          {
            menuValue: 'Horizontal Form',
            route: routes.horizontalForm,
            base: routes.horizontalForm,
          },
          {
            menuValue: 'Vertical Form',
            route: routes.verticalForm,
            base: routes.verticalForm,
          },
          {
            menuValue: 'Form Mask',
            route: routes.formMask,
            base: routes.formMask,
          },
          {
            menuValue: 'Form Validation',
            route: routes.formValidation,
            base: routes.formValidation,
          },
          {
            menuValue: 'Form Select2',
            route: routes.formSelect2,
            base: routes.formSelect2,
          },
          {
            menuValue: 'File Upload',
            route: routes.fileUpload,
            base: routes.fileUpload,
          },
        ],
      },
      {
        menuValue: 'Tables',
        route: routes.dashboard,
        hasSubRoute: true,
        showSubRoute: false,
        icon: 'alert-octagon',
        base: 'tables',
        subMenus: [
          {
            menuValue: 'Basic Tables',
            route: routes.basicTable,
            base: routes.basicTable,
          },
          {
            menuValue: 'Data Tables',
            route: routes.dataTable,
            base: routes.dataTable,
          },
        ],
      },
    ],
  },
  {
    tittle: 'Settings',
    active: false,
    icon: 'airplay',
    showAsTab: false,
    separateRoute: false,
    menu: [
      {
        menuValue: 'Settings',
        route: routes.profileSettings,
        hasSubRoute: false,
        showSubRoute: false,
        icon: 'settings',
        base: 'settings',
        subMenus: [],
      },
      {
        menuValue: 'Logout',
        route: routes.login,
        hasSubRoute: false,
        showSubRoute: false,
        icon: 'power',
        base: 'power',
        subMenus: [],
      },
    ],
  },
  {
    tittle: 'Extras',
    active: false,
    icon: 'airplay',
    showAsTab: false,
    separateRoute: false,
    menu: [
      {
        menuValue: 'Documentation',
      
        hasSubRoute: false,
        showSubRoute: false,
        icon: 'file-text',
        base: 'file-text',
        subMenus: [],
      },
      {
        menuValue: 'Change Log',
        changeLogVersion: true,
        hasSubRoute: false,
        showSubRoute: false,
        icon: 'lock',
        base: 'lock',
        subMenus: [],
      }
      
    ],
  },
];

public getSideBarData: BehaviorSubject<Array<SideBarData>> =
  new BehaviorSubject<Array<SideBarData>>(this.sideBar);

public resetData(): void {
  this.sideBar.map((res: SideBar ) => {
    res.showAsTab = false;
    res.menu.map((menus: SideBarMenu) => {
      menus.showSubRoute = false;
    });
  });
}
public planBillingOwl = [
  {
    name: 'Basic',
    remainingDays: '36 days remaining',
    price: '$49.99',
    billingPeriod: 'Monthly',
    text: "Cancel Subscription",
    img: 'assets/img/icons/basic.svg',
    customClass: true
  },
  {
    name: 'ENTERPRISES',
    remainingDays: '365 days remaining',
    price: '$199.99',
    billingPeriod: 'Yearly',
    text: "Upgrade",
    img: 'assets/img/icons/basic.svg',
    customClass: false
  },
  {
    name: 'Basic',
    remainingDays: '36 days remaining',
    price: '$49.99',
    billingPeriod: 'Monthly',
    text: "Cancel Subscription",
    img: 'assets/img/icons/basic.svg',
    customClass: false
  },
  {
    name: 'ENTERPRISES',
    remainingDays: '365 days remaining',
    price: '$199.99',
    billingPeriod: 'Yearly',
    text: "Upgrade",
    img: 'assets/img/icons/basic.svg',
    customClass: false
  },
];
}
