import { ConfigureOptions, ILoader, Environment } from "nunjucks";
import { ModuleMetadata } from "@nestjs/common/interfaces";

export interface NunjucksModuleOptions {
    paths: string[];
    options: ConfigureOptions;
    additional_loaders?: ILoader[];
    envConstructor?: (environment: Environment) => Environment;
}

export interface NunjucksModuleOptionsAsync
    extends Pick<ModuleMetadata, "imports"> {
    inject: any[];
    useFactory: (
        ...args: any[]
    ) => Promise<NunjucksModuleOptions> | NunjucksModuleOptions;
}
