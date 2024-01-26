import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className={title()}>HaeBoJa&nbsp;</h1>
        <h1 className={title({ color: "violet" })}>해보자&nbsp;</h1>
        <br />
        <h1 className={title()}>당장 생각나는 해야할것들</h1>
        <h2 className={subtitle({ class: "mt-4" })}>
          일단은 기록하고 해보는거예요!
        </h2>
      </div>

      <div className="flex gap-3">
        <Link
          isExternal
          className={buttonStyles({ variant: "bordered", radius: "full" })}
          href={siteConfig.links.github}
        >
          <GithubIcon size={20} />
          GitHub(HaeBoJa)
        </Link>
      </div>

      <div className="mt-8">
        <Snippet hideSymbol hideCopyButton variant="flat">
          <span>
            사용 기술 <Code color="primary">Next.js</Code>{" "}
            <Code color="primary">Typescript</Code>{" "}
            <Code color="primary">TailwindCSS</Code>
          </span>
        </Snippet>
      </div>
    </section>
  );
}
