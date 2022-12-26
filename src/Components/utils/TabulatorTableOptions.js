const style1 = {
    printRowRange: "all",
    printConfig: {
        // columnHeaders:false, //do not include column headers in printed table
        // columnGroups:false, //do not include column groups in column headers for printed table
        // rowGroups:false, //do not include row groups in printed table
        // columnCalcs:false, //do not include column calcs in printed table
        dataTree: false, //do not include data tree in printed table
        formatCells: false, //show raw cell values without formatter
    },
    printAsHtml: true, //enable html table printing
    // printCopyStyle:true, //copy Tabulator styling to HTML table
    printStyled: true, //copy Tabulator styling to HTML table

    height: "70vh",
    maxHeight: "60%",
    // printAsHtml: true,
    // layout: "fitDataStretch",
    layout: "fitDataFill",
    // responsiveLayout: "collapse",
    movableColumns: true, //enable user movable columns
    selectable: 1,
    pagination: "local",
    paginationSize: 10,
    paginationSizeSelector: [10, 20, 40, 80, true],
    locale: "fa-ir",
    langs: {
        "fa-ir": {
            columns: {
                name: "Name", //replace the title of column name with the value "Name"
            }, data: {
                loading: "در حال بارگذاری", //data loader text
                error: "بارگذاری داده با خطا مواجه شد", //data error text
            }, groups: {
                //copy for the auto generated item count in group header
                item: "item", //the singular  for item
                items: "items", //the plural for items
            }, pagination: {
                page_size: "تعداد در صفحه", //label for the page size select element
                page_title: "نمایش صفحه", //tooltip text for the numeric page button, appears in front of the page number (eg. "Show Page" will result in a tool tip of "Show Page 1" on the page 1 button)
                first: "اولین", //text for the first page button
                first_title: "اولین صفحه", //tooltip text for the first page button
                last: "آخرین",
                last_title: "آخرین صفحه",
                prev: "قبلی",
                prev_title: "صفحه قبلی",
                next: "بعدی",
                next_title: "صفحه بعدی",
                all: "همه",
                counter: {
                    showing: "Showing", of: "of", rows: "ردیف ها", pages: "صفحه ها",
                },
            }, headerFilters: {
                default: "فیلتر ...", //default header filter placeholder text
                columns: {
                    name: "filter name...", //replace default header filter text for column name
                },
            },
        },
    },
};

const style2TaskView = {
  printStyled: true, //copy Tabulator styling to HTML table
  height: "34vh",
  // maxHeight: "60%",
  width:"100%",
  printAsHtml: true,
  // layout: "fitDataStretch",
  layout: "fitDataFill",
  // responsiveLayout: "collapse",
};

const TabulatorTableOptions = {
    style1,
    style2TaskView,

};

export default TabulatorTableOptions;