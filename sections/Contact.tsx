import { site } from "@/lib/site";
import { cn } from "@/lib/cn";
import { afterSectionHeading, focusRing, sectionHeading } from "@/lib/ui";
import { ContactForm } from "@/components/ContactForm";
import {
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
} from "@/components/SocialIcons";

const CONTACT_INTRO =
  "Fill out the form or reach out directly. I typically respond within 24–48 hours.";

const asideTitle = "Open to opportunities";
const asideBody =
  "I am interested in internships, research collaboration, and project-based work across AI, machine learning, and full-stack engineering.";

const cardShell = cn(
  "rounded-xl border border-border-muted/85 bg-card p-4 sm:p-6 md:p-8",
  "shadow-[0_1px_0_rgba(255,255,255,0.04)_inset]",
);

const infoIconBox = cn(
  "flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-accent/35 bg-surface-input text-accent",
);

const infoLabel = "text-xs font-medium text-muted-foreground sm:text-[13px]";
const infoValue =
  "mt-0.5 text-sm font-semibold text-foreground sm:text-[15px]";

const connectSocialBox = cn(
  "inline-flex h-11 w-11 touch-manipulation items-center justify-center rounded-md border border-border-muted/80 text-muted-foreground",
  "transition-[border-color,color] duration-200 ease-out hover:border-accent/35 hover:text-accent-hover",
  focusRing,
);

const cardHeading =
  "text-base font-semibold tracking-tight text-foreground sm:text-lg";

export function Contact() {
  const { email, phone, linkedIn, github } = site.contact;
  const phoneTel = `tel:${phone.replace(/\s/g, "")}`;
  const locationLine = `${site.educationSchool}, Pakistan`;

  return (
    <div className="text-left">
      <h2 className={sectionHeading}>{site.contactTitle}</h2>

      <div
        className={cn(
          afterSectionHeading,
          "grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-10 xl:gap-12",
        )}
      >
        <div className="flex min-w-0 flex-col gap-6">
          <div className={cardShell}>
            <h3 className={cardHeading}>Contact information</h3>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-[15px] sm:leading-relaxed">
              {CONTACT_INTRO}
            </p>

            <ul className="mt-8 flex flex-col gap-6" role="list">
              <li className="flex gap-4">
                <div className={infoIconBox} aria-hidden>
                  <MailIcon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className={infoLabel}>Email</p>
                  <a
                    href={`mailto:${email}`}
                    className={cn(
                      infoValue,
                      "block break-all transition-colors hover:text-accent-hover",
                      focusRing,
                      "rounded-sm",
                    )}
                  >
                    {email}
                  </a>
                </div>
              </li>
              <li className="flex gap-4">
                <div className={infoIconBox} aria-hidden>
                  <PhoneIcon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className={infoLabel}>Phone</p>
                  <a
                    href={phoneTel}
                    className={cn(
                      infoValue,
                      "inline-block transition-colors hover:text-accent-hover",
                      focusRing,
                      "rounded-sm",
                    )}
                  >
                    {phone}
                  </a>
                </div>
              </li>
              <li className="flex gap-4">
                <div className={infoIconBox} aria-hidden>
                  <MapPinIcon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className={infoLabel}>Location</p>
                  <p className={infoValue}>{locationLine}</p>
                </div>
              </li>
            </ul>

            <div
              className="mt-8 border-t border-border-muted/75 pt-8"
              aria-label="Social profiles"
            >
              <p className={infoLabel}>Connect</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <a
                  href={linkedIn}
                  className={connectSocialBox}
                  rel="noopener noreferrer"
                  target="_blank"
                  aria-label="LinkedIn"
                >
                  <LinkedInIcon className="h-[18px] w-[18px]" />
                </a>
                <a
                  href={github}
                  className={connectSocialBox}
                  rel="noopener noreferrer"
                  target="_blank"
                  aria-label="GitHub"
                >
                  <GitHubIcon className="h-[18px] w-[18px]" />
                </a>
                <a
                  href={`mailto:${email}`}
                  className={connectSocialBox}
                  aria-label={`Email ${email}`}
                >
                  <MailIcon className="h-[18px] w-[18px]" />
                </a>
              </div>
            </div>
          </div>

          <div className={cardShell}>
            <h3 className={cardHeading}>{asideTitle}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-[15px] sm:leading-relaxed">
              {asideBody}
            </p>
          </div>
        </div>

        <div className={cn(cardShell, "min-w-0")}>
          <h3 className={cardHeading}>Send a message</h3>
          <div className="mt-6">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
