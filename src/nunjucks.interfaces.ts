import { ConfigureOptions } from "nunjucks";
import { ModuleMetadata } from "@nestjs/common/interfaces";

export interface NunjucksModuleOptions {
    paths: string[];
    options: ConfigureOptions;
}

export interface NunjucksModuleOptionsAsync
    extends Pick<ModuleMetadata, "imports"> {
    inject: any[];
    useFactory: (
        ...args: any[]
    ) => Promise<NunjucksModuleOptions> | NunjucksModuleOptions;
}
