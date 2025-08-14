export default function Head() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Maxwell Young",
            jobTitle: "Design Engineer",
            url: "https://dev.maxwellyoung.info/",
            email: "mailto:maxtheyoung@gmail.com",
            sameAs: [
              "https://github.com/maxwellyoung",
              "https://www.linkedin.com/in/maxwell-young-a55032125/",
            ],
          }),
        }}
      />
    </>
  );
}


