# Installation

-   Firstly, you must to install `nunjucks`

    ```bash
    npm install nunjucks
    npm install @types/nunjucks --dev
    ```

-   Well! Now you can to install `nest-nunjucks`

    ```bash
    npm install nest-nunjucks
    ```

-   Register NunjucksModule in your root module, like this:

    ```typescript
    @Module({
        imports: [
            NunjucksModule.forRoot({
                paths: [
                    "./template",
                    "./template/partials",
                    "./template/layouts",
                ],
                options: {},
            }),
        ],
    })
    export class AppModule {}
    ```

    Nunjucks module has 2 static methods for creating dynamic module:

    -   `forRoot`
    -   `forRootAsync`

# TODO's

-   Write this documentation
