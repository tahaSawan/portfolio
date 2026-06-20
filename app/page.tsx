import { Section } from "@/components/Section";
import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { Skills } from "@/sections/Skills";
import { Projects } from "@/sections/Projects";
import { Education } from "@/sections/Education";
import { GitHubActivity } from "@/sections/GitHubActivity";
import { JobFit } from "@/sections/JobFit";
import { Contact } from "@/sections/Contact";
import { site } from "@/lib/site";
import { withDiskScreenshotsAll } from "@/lib/projectDiskScreenshots";

export default async function HomePage() {
  const projects = withDiskScreenshotsAll(site.projects);

  return (
    <main className="pb-28 sm:pb-36 md:pb-40">
      <Section id="top" className="!py-0" divider={false} circuitGlow={false}>
        <Hero />
      </Section>
      <Section id="about" divider={false} reveal>
        <About />
      </Section>
      <Section id="skills" tone="muted" divider reveal>
        <Skills />
      </Section>
      <Section id="projects" divider reveal>
        <Projects projects={projects} />
      </Section>
      <Section id="github" tone="muted" divider reveal>
        <GitHubActivity />
      </Section>
      <Section id="job-fit" divider reveal>
        <JobFit />
      </Section>
      <Section id="education" tone="muted" divider reveal>
        <Education />
      </Section>
      <Section id="contact" divider reveal>
        <Contact />
      </Section>
    </main>
  );
}
