import { Module, DynamicModule, Global } from "@nestjs/common";
import {
    NunjucksModuleOptions,
    NunjucksModuleOptionsAsync,
} from "./nunjucks.interfaces";
import { OPTIONS_PROVIDER_TOKEN } from "./constances";
import { NunjucksService } from "./nunjucks.service";

@Global()
@Module({})
export class NunjucksModule {
    static forRoot(options: NunjucksModuleOptions): DynamicModule {
        return {
            module: NunjucksModule,
            providers: [
                {
                    provide: OPTIONS_PROVIDER_TOKEN,
                    useValue: options,
                },
                NunjucksService,
            ],
            exports: [NunjucksService],
        };
    }

    static forRootAsync(options: NunjucksModuleOptionsAsync): DynamicModule {
        return {
            module: NunjucksModule,
            providers: [
                {
                    provide: OPTIONS_PROVIDER_TOKEN,
                    useFactory: options.useFactory,
                    inject: options.inject || [],
                },
                NunjucksService,
            ],
            imports: options.imports || [],
            exports: [NunjucksService],
        };
    }
}
