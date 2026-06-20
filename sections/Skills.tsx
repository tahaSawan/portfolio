import { site } from "@/lib/site";
import { cn } from "@/lib/cn";
import {
  afterSectionHeading,
  chipMatte,
  sectionHeading,
  subsectionTitle,
} from "@/lib/ui";

export function Skills() {
  return (
    <div className="text-left">
      <h2 className={sectionHeading}>{site.skillsTitle}</h2>
      <div
        className={cn(
          afterSectionHeading,
          "grid grid-cols-1 gap-7 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-11 lg:gap-y-11",
        )}
      >
        {site.skillGroups.map((group) => (
          <div key={group.title}>
            <h3 className={subsectionTitle}>{group.title}</h3>
            <ul className="mt-5 flex flex-wrap gap-2.5 sm:mt-6">
              {group.items.map((skill) => (
                <li key={skill}>
                  <span className={chipMatte}>{skill}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
