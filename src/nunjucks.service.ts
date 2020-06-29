import { Injectable, Inject } from "@nestjs/common";
import * as nunjucks from "nunjucks";
import { OPTIONS_PROVIDER_TOKEN } from "./constances";
import { NunjucksModuleOptions } from "./nunjucks.interfaces";

@Injectable()
export class NunjucksService {
    constructor(
        @Inject(OPTIONS_PROVIDER_TOKEN) options: NunjucksModuleOptions
    ) {
        nunjucks.configure(options.paths, options.options);
    }

    render(name: string, context?: Record<string, any>): Promise<string> {
        return new Promise((res, rej) => {
            nunjucks.render(name, context, (err, result) => {
                if (err) {
                    return rej(err);
                }
                return res(result as string);
            });
        });
    }

    renderString(str: string, context: Record<string, any>): Promise<string> {
        return new Promise((res, rej) => {
            nunjucks.renderString(str, context, (err, result) => {
                if (err) {
                    return rej(err);
                }
                return res(result as string);
            });
        });
    }
}
