export class Template extends AventusTemplate {
    protected override meta(): TemplateInfo {
        return {
            name: "Laraventus.Project",
            description: "Create a Laraventus project",
            organization: "Cobwebsite",
            installationFolder: "Laraventus/Project",
            isProject: true,
            tags: ["Laravel", "Project"],
            version: "0.0.3",
            allowQuick: false,
            documentation: "https://laraventus.com",
            repository: "https://github.com/Cobwebsite/Laraventus_Template_Project",
        };
    }
    protected override async run(destination: string): Promise<void> {
        let name = await this.input({
            title: "Provide a name for your project",
        });
        if(!name) return;

        this.registerVar("name", name);

        let prefix = await this.input({
            title: "Provide a pefix for your components",
            value: "av"
        });
        if(!prefix) return;

        this.registerVar("prefix", prefix);

        await this.writeFile();

        let gitInit = await this.select([{ label: "Yes" }, { label: "No" }], { title: "Run : git init ?" });
        if(gitInit?.label == "Yes") {
            await this.exec("git init");
        }

        let running = await this.select([{ label: "Yes" }, { label: "No" }], { title: "Run : composer install ?" });
        if(running?.label == "Yes") {
            const uuid = await this.showProgress("Running composer install...");
            await this.exec("composer install");
            this.hideProgress(uuid);
        }
    }

}