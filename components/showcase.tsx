"use client"

export default function Showcase() {
  const examples = [
    {
      id: 1,
      before: "/diverse-person-portrait.png",
      after: "/portrait-with-purple-background.jpg",
      title: "Background Change",
      description: "Transform any background instantly",
    },
    {
      id: 2,
      before: "/landscape-city.png",
      after: "/landscape-city-at-night.jpg",
      title: "Scene Editing",
      description: "Modify lighting and atmosphere",
    },
    {
      id: 3,
      before: "/brown-haired-person.png",
      after: "/blonde-hair-portrait.png",
      title: "Character Editing",
      description: "Edit character details precisely",
    },
  ]

  return (
    <section id="showcase" className="py-20 px-4 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Case Studies</h2>
          <p className="text-xl text-foreground/60 max-w-2xl mx-auto">
            See what's possible with Nano Banana's powerful AI editing capabilities
          </p>
        </div>

        {/* Examples Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {examples.map((example) => (
            <div
              key={example.id}
              className="bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/50 transition"
            >
              {/* Before/After Images */}
              <div className="relative h-80">
                <div className="absolute inset-0 flex">
                  {/* Before */}
                  <div className="flex-1 bg-muted flex items-center justify-center border-r border-border">
                    <img
                      src={example.before || "/placeholder.svg"}
                      alt="Before"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* After */}
                  <div className="flex-1 bg-muted flex items-center justify-center">
                    <img src={example.after || "/placeholder.svg"} alt="After" className="w-full h-full object-cover" />
                  </div>
                </div>
                {/* VS Badge */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-primary/90 text-primary-foreground font-bold px-3 py-1 rounded-full text-sm">
                    VS
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-foreground mb-2">{example.title}</h3>
                <p className="text-foreground/60">{example.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Banana Decoration */}
        <div className="flex justify-center mt-12">
          <div className="text-6xl opacity-30">🍌</div>
        </div>
      </div>
    </section>
  )
}
