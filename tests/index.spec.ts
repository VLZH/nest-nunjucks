import { Test } from "@nestjs/testing";
import { FileSystemLoader } from "nunjucks";
import { NunjucksService } from "../src/nunjucks.service";
import { NunjucksModule } from "../src/nunjucks.module";
import { NunjucksModuleOptions } from "../src/nunjucks.interfaces";
import { OPTIONS_PROVIDER_TOKEN } from "../src/constances";

describe("forRoot", () => {
    let nunjucksService: NunjucksService;
    let nunjucksOptions: NunjucksModuleOptions;

    const TEMPLATES = ["./tests/templates", "./tests/templates/layouts"];

    beforeAll(async () => {
        const tmb = Test.createTestingModule({
            imports: [
                NunjucksModule.forRoot({ paths: TEMPLATES, options: {} }),
            ],
        });
        const module = await tmb.compile();

        nunjucksOptions = module.get<NunjucksModuleOptions>(
            OPTIONS_PROVIDER_TOKEN
        );
        nunjucksService = module.get<NunjucksService>(NunjucksService);
    });

    it("Has correct config", async () => {
        expect(nunjucksOptions.paths).toBe(TEMPLATES);
    });

    it("method renderString()", async () => {
        const result = await nunjucksService.renderString("Some {{val1}}", {
            val1: "template",
        });
        expect(result).toBe("Some template");
    });

    it("method render()", async () => {
        const result = await nunjucksService.render("index.html");
        expect(result).toMatchSnapshot();
    });

    it("unknown template", async () => {
        await expect(
            nunjucksService.render("unknown.njk", {})
        ).rejects.toThrowError();
    });
});

describe("using Environment", () => {
    let nunjucksService: NunjucksService;
    let nunjucksOptions: NunjucksModuleOptions;

    const TEMPLATES = ["./tests/templates", "./tests/templates/layouts"];

    beforeAll(async () => {
        const tmb = Test.createTestingModule({
            imports: [
                NunjucksModule.forRoot({
                    paths: TEMPLATES,
                    options: {},
                    envConstructor: (env) => {
                        return env.addGlobal(
                            "logo",
                            "http://somesite.com/logo.png"
                        );
                    },
                }),
            ],
        });
        const module = await tmb.compile();

        nunjucksOptions = module.get<NunjucksModuleOptions>(
            OPTIONS_PROVIDER_TOKEN
        );
        nunjucksService = module.get<NunjucksService>(NunjucksService);
    });

    it("[snapshot ]check with_logo.njk", async () => {
        const result = await nunjucksService.render("with_logo.html");
        expect(result).toMatchSnapshot();
    });
});

