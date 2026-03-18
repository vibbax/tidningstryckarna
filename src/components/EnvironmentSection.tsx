import envImg from "@/assets/environment.jpg";

const EnvironmentSection = () => {
  return (
    <section id="miljo" className="py-20 md:py-28 bg-background">
      <div className="container px-4">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="order-2 md:order-1">
            <p className="font-body text-sm uppercase tracking-[0.2em] text-forest font-semibold mb-3">Miljö</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
              Miljömedveten produktion
            </h2>
            <p className="font-body text-muted-foreground leading-relaxed mb-4">
              Vi jobbar aktivt med att vara miljömedvetna och minska vår miljöbelastning. Vi har en policy att återanvända när det är möjligt för att minska på onödigt spill.
            </p>
            <p className="font-body text-muted-foreground leading-relaxed">
              Vår högteknologiska maskinpark drivs med fokus på hållbarhet. När vi behöver anlita experter utanför tryckeriet vänder vi oss i första hand till våra lokala leverantörer på Åland, vilket stödjer det lokala samhället.
            </p>
          </div>

          <div className="order-1 md:order-2 relative">
            <img
              src={envImg}
              alt="Miljömedveten produktion"
              className="rounded shadow-elevated w-full object-cover aspect-[4/3]"
            />
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-forest/15 rounded -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnvironmentSection;
