export interface AboutContent {
  // Hero Section - Brand Introduction
  heroTitle: string;
  heroSubtitle: string;
  brandDescription: string;

  // Sofia's Story Section
  storyTitle: string;
  storySubtitle: string;
  storyParagraph1: string;
  storyParagraph2: string;
  storyParagraph3: string;
  storyParagraph4: string;
  storyParagraph5: string;

  // Personal Details
  founderName: string;
  personalInterests: string;

  // Founder Quote Section
  founderQuoteTitle: string;
  founderQuote: string;
  founderSignature: string;

  // Company Info
  companyName: string;
  address: string;

  // Disclaimer Section
  disclaimerTitle: string;
  disclaimerContent: string;
  disclaimerContact: string;
}

export const defaultAboutContent: AboutContent = {
  // Hero Section - Brand Introduction
  heroTitle: "Sunrise Scents Brand",
  heroSubtitle: "A fragrance house rooted in emotion, memory, and mindful escape",
  brandDescription: "Sunrise Scents is a fragrance house rooted in emotion, memory, and mindful escape. We craft both inspired scents—reimagined from iconic favorites—and original creations designed to stir the senses and soothe the soul.\n\nEach fragrance invites you on a journey: to relive a cherished moment, find calm in the chaos, or simply feel more like yourself. From the crisp air of a Vermont morning to the sweetness of sunlit memories, our scents are made to transport you. Beautifully crafted and affordably priced, Sunrise Scents brings you luxury that feels personal, grounded, and within reach.",

  // Sofia's Story Section
  storyTitle: "Our Story",
  storySubtitle: "Sunrise Scents: A Story of Passion and Healing",
  storyParagraph1: "Welcome to Sunrise Scents. I'm Sofia Hansen, and my journey into perfumery began as a way to find solace during my late husband's battle with brain cancer. In early 2024, I discovered Middle Eastern perfumes—their rich scents, beautiful bottles, and affordability captivated me. I immersed myself in the craft, taking online courses, listening to podcasts, and reading books on fragrance blending. I experimented with materials, creating my first gourmand scent—marshmallow—and fell in love with the art and science behind perfumery.",
  storyParagraph2: "To deepen my knowledge, I traveled to Dubai to learn from master perfumers, an incredible experience that refined my skills. Understanding fragrance composition, longevity, and adherence to International Fragrance Association (IFRA) regulations became essential in crafting high-quality, long-lasting scents. What started as a personal escape soon became a passion I wanted to share. Encouraged by friends and family who loved my creations, I turned it into a small business alongside my full-time job.",
  storyParagraph3: "Beyond perfumery, I cherish running and photography. My yellow Labrador, Missy, is my running companion, and the landscapes we explore—Vermont, New Hampshire, New York, Boston, and beyond—inspire me. I incorporate my own scenic photography into my perfume labels, capturing the beauty of these places to share with you.",
  storyParagraph4: "The name Sunrise Scents is a tribute to my husband, who loved Norah Jones' song Sunrise. It represents new beginnings, blending my love for fragrance, nature, and photography. My goal is to offer affordable, beautifully crafted perfumes that bring joy, just as perfumery has brought joy to me. Thank you for visiting and sharing in this journey.",
  storyParagraph5: "",

  // Personal Details
  founderName: "Sofia Hansen",
  personalInterests: "Beyond perfumery, I cherish running and photography. My yellow Labrador, Missy, is my running companion, and the landscapes we explore inspire my creations.",

  // Founder Quote Section
  founderQuoteTitle: "A Message from Our Founder",
  founderQuote: "At Sunrise Scents, I pour my heart and soul into every fragrance I create. Each scent is designed not just to smell beautiful, but to uplift the mind, soothe the body, and speak to the soul. I listen closely to my customers, crafting perfumes with exceptional scent, longevity, and sillage—housed in bottles that showcase the beauty of real places, so every spray becomes a sensory escape to somewhere meaningful.",
  founderSignature: "— Sofia Hansen, CEO & Founder",

  // Company Info
  companyName: "Sunrise Scents, LLC.",
  address: "PO Box 241\nQuechee, Vermont 05059",

  // Disclaimer Section
  disclaimerTitle: "Disclaimer - Sunrise Scents",
  disclaimerContent: "At Sunrise Scents, we offer a curated collection of original perfumes and inspired fragrances that capture the essence of well-known scents while offering a unique experience of our own. Our inspired scents are interpretations created through careful formulation and chemical analysis. These products are not to be mistaken for the originals and are not exact copies.\n\nWe are not affiliated with, endorsed by, or in any way connected to the original designers, brands, or manufacturers mentioned throughout our website or marketing materials. Any trademarks, brand names, or copyrights are the sole property of their respective owners and are used only for identification and comparison purposes.\n\nSunrise Scents operates independently and in full compliance with the Federal Trade Commission's Statement of Policy Regarding Comparative Advertising (16 C.F.R. §14.15(b)). Our goal is to offer high-quality, affordable fragrances that evoke emotional and sensory experiences—never to mislead or confuse customers.\n\nBy purchasing from Sunrise Scents, you acknowledge that you are buying an independently crafted fragrance and not a product affiliated with any designer or brand.",
  disclaimerContact: "For any questions regarding this disclaimer or our products, please contact us at customersupport@sunrisescents.com."
};
