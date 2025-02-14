const queryOptionsDefaults = {
    formatted: false,
    lang: "en-US",
    region: "US",
};
export default function options(symbol, queryOptionsOverrides, moduleOptions) {
    return this._moduleExec({
        moduleName: "options",
        query: {
            assertSymbol: symbol,
            url: "https://${YF_QUERY_HOST}/v7/finance/options/" + symbol,
            schemaKey: "#/definitions/OptionsOptions",
            defaults: queryOptionsDefaults,
            overrides: queryOptionsOverrides,
            transformWith(queryOptions) {
                const date = queryOptions.date;
                if (date) {
                    // yfDate will convert valid number/string to Date.
                    if (date instanceof Date) {
                        // now we convert back to unix epoch in seconds for query
                        queryOptions.date = Math.floor(date.getTime() / 1000);
                    }
                    else {
                        // yfDate didn't recognize it as a date.
                        throw new Error("Unsupported date type: " + date);
                    }
                }
                return queryOptions;
            },
        },
        result: {
            schemaKey: "#/definitions/OptionsResult",
            transformWith(result) {
                if (!result.optionChain)
                    throw new Error("Unexpected result: " + JSON.stringify(result));
                return result.optionChain.result[0];
            },
        },
        moduleOptions,
    });
}
