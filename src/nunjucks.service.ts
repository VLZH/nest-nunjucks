import { Injectable, Inject } from "@nestjs/common";
import * as nunjucks from "nunjucks";
import { OPTIONS_PROVIDER_TOKEN } from "./constances";
import { NunjucksModuleOptions } from "./nunjucks.interfaces";

@Injectable()
export class NunjucksService {
    env: nunjucks.Environment;
    constructor(
        @Inject(OPTIONS_PROVIDER_TOKEN) options: NunjucksModuleOptions
    ) {
        this.env = nunjucks.configure(options.paths, options.options);
        if (options.envConstructor) {
            if (
                !options.additional_loaders ||
                !options.additional_loaders.length
            ) {
                console.warn(
                    "[nest-nunjucks] You used envConstructor without loaders. Are you shure in it?"
                );
                options.additional_loaders = [];
            }
            this.env = new nunjucks.Environment([
                ...options.paths.map(
                    (p) =>
                        new nunjucks.FileSystemLoader(p, {
                            noCache: options.options.noCache,
                            watch: options.options.watch,
                        })
                ),
                ...options.additional_loaders,
            ]);
            this.env = options.envConstructor(this.env);
        }
    }

    render(name: string, context?: Record<string, any>): Promise<string> {
        return new Promise((res, rej) => {
            this.env.render(name, context, (err, result) => {
                if (err) {
                    return rej(err);
                }
                return res(result as string);
            });
        });
    }

    renderString(str: string, context: Record<string, any>): Promise<string> {
        return new Promise((res, rej) => {
            this.env.renderString(str, context, (err, result) => {
                if (err) {
                    return rej(err);
                }
                return res(result as string);
            });
        });
    }
}
