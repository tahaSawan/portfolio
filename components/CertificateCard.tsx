import Image from "next/image";
import type { Certification } from "@/lib/certifications";
import { certificateImageUrl } from "@/lib/certifications";
import { cn } from "@/lib/cn";
import { cardSurfaceTransition, labelOverline } from "@/lib/ui";

type CertificateCardProps = {
  cert: Certification;
};

export function CertificateCard({ cert }: CertificateCardProps) {
  const imageSrc = certificateImageUrl(cert.imageFile);

  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-lg border border-border-muted/85 bg-surface-raised",
        cardSurfaceTransition,
        "hover:border-accent/32 hover:bg-card motion-safe:hover:-translate-y-0.5 motion-reduce:hover:translate-y-0",
      )}
    >
      <a
        href={imageSrc}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "relative block aspect-[4/3] w-full overflow-hidden border-b border-border-muted/80 bg-surface-input",
          "outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        )}
        aria-label={`View ${cert.title} certificate`}
      >
        <Image
          src={imageSrc}
          alt={`${cert.title} certificate from ${cert.issuer}`}
          fill
          className="object-contain p-2 transition duration-300 ease-out group-hover:scale-[1.02]"
          sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 100vw"
          unoptimized
        />
      </a>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <p className={labelOverline}>{cert.issuer}</p>
        <h4 className="mt-2 text-sm font-semibold leading-snug tracking-tight text-foreground sm:text-[15px]">
          {cert.title}
        </h4>
        <p className="mt-2 text-xs text-muted-foreground sm:text-sm">{cert.date}</p>
        {cert.verifyUrl ? (
          <a
            href={cert.verifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto pt-3 text-xs font-medium text-accent hover:underline sm:text-sm"
          >
            Verify credential
          </a>
        ) : null}
      </div>
    </article>
  );
}
