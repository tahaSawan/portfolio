"use client";

import { useState } from "react";
import { certifications } from "@/lib/certifications";
import { CertificateCard } from "@/components/CertificateCard";
import { CertificateLightbox } from "@/components/CertificateLightbox";

export function CertificateGallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = () => setActiveIndex(null);
  const goPrev = () =>
    setActiveIndex((i) =>
      i === null ? null : (i + certifications.length - 1) % certifications.length,
    );
  const goNext = () =>
    setActiveIndex((i) =>
      i === null ? null : (i + 1) % certifications.length,
    );

  const activeCert =
    activeIndex === null ? null : certifications[activeIndex];

  return (
    <>
      <div className="mt-5 grid grid-cols-1 gap-4 sm:mt-6 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {certifications.map((cert, index) => (
          <CertificateCard
            key={cert.id}
            cert={cert}
            onImageClick={() => setActiveIndex(index)}
          />
        ))}
      </div>

      {activeCert && activeIndex !== null ? (
        <CertificateLightbox
          cert={activeCert}
          index={activeIndex}
          total={certifications.length}
          onClose={close}
          onPrev={goPrev}
          onNext={goNext}
        />
      ) : null}
    </>
  );
}
