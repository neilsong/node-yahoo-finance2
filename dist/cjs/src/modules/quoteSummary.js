"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quoteSummary_modules = void 0;
exports.quoteSummary_modules = [
    "assetProfile",
    "balanceSheetHistory",
    "balanceSheetHistoryQuarterly",
    "calendarEvents",
    "cashflowStatementHistory",
    "cashflowStatementHistoryQuarterly",
    "defaultKeyStatistics",
    "earnings",
    "earningsHistory",
    "earningsTrend",
    "financialData",
    "fundOwnership",
    "fundPerformance",
    "fundProfile",
    "incomeStatementHistory",
    "incomeStatementHistoryQuarterly",
    "indexTrend",
    "industryTrend",
    "insiderHolders",
    "insiderTransactions",
    "institutionOwnership",
    "majorDirectHolders",
    "majorHoldersBreakdown",
    "netSharePurchaseActivity",
    "price",
    "quoteType",
    "recommendationTrend",
    "secFilings",
    "sectorTrend",
    "summaryDetail",
    "summaryProfile",
    "topHoldings",
    "upgradeDowngradeHistory",
];
const queryOptionsDefaults = {
    formatted: false,
    modules: ["price", "summaryDetail"],
};
function quoteSummary(symbol, queryOptionsOverrides, moduleOptions) {
    return this._moduleExec({
        moduleName: "search",
        query: {
            assertSymbol: symbol,
            url: "https://${YF_QUERY_HOST}/v10/finance/quoteSummary/" + symbol,
            needsCrumb: true,
            schemaKey: "#/definitions/QuoteSummaryOptions",
            defaults: queryOptionsDefaults,
            overrides: queryOptionsOverrides,
            transformWith(options) {
                if (options.modules === "all")
                    options.modules = exports.quoteSummary_modules;
                return options;
            },
        },
        result: {
            schemaKey: "#/definitions/QuoteSummaryResult",
            transformWith(result) {
                if (!result.quoteSummary)
                    throw new Error("Unexpected result: " + JSON.stringify(result));
                return result.quoteSummary.result[0];
            },
        },
        moduleOptions,
    });
}
exports.default = quoteSummary;
