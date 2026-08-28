// Style reminder: preserve the Boost Vertex Figma recreation — obsidian surfaces, electric-lime actions, Chivo headlines, Inter body copy, and an 8px rhythm.
import { FormEvent, useEffect, useState } from "react";
import { MarketingHeader } from "@/components/MarketingChrome";
import { approvedContact } from "@/data/marketingContent";
import { mergeTestimonial } from "@/lib/contentFallback";
import { contactService } from "@/services/contactService";
import { contentService, type TestimonialContent } from "@/services/contentService";

// Boost Vertex Home style contract: preserve the Figma-locked desktop and mobile hero composition while routing About to its dedicated page.

const clientTestimonials: TestimonialContent[] = [
  { id: "testimonial-movepro", name: "Hasnain Ahmed", role: "Founder & CEO — MovePro Pakistan", quote: "Boost Vertex helped us generate high-quality and mature leads through Meta Ads. The leads were relevant to our business, and we were happy with the overall quality." },
  { id: "testimonial-waqas", name: "Dr. Waqas Ahmad", role: "Lead Generation Client", quote: "Boost Vertex helped us generate relevant leads for our business. They understood our requirements and delivered a good response through their lead-generation campaigns." },
  { id: "testimonial-whizpool", name: "Muhammad Bilal", role: "Whizpool — Software Company", quote: "Boost Vertex supported us with social media management and Meta Ads. Their work helped improve our online presence and created better opportunities through our digital channels." },
  { id: "testimonial-ah-interior", name: "AH Interior", role: "Client", quote: "Boost Vertex helped us generate proper leads through Meta Ads for our business. We received relevant inquiries from potential customers and were satisfied with the response." },
  { id: "testimonial-ali", name: "Mr. Ali", role: "Founder — Software Company", quote: "Boost Vertex helped us generate mature and relevant leads through LinkedIn and Meta Ads. The campaigns were focused on reaching the right prospects for our business." },
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeTray, setActiveTray] = useState<string | null>(null);
  const [actionMessage, setActionMessage] = useState("");
  const [testimonials, setTestimonials] = useState<TestimonialContent[]>(clientTestimonials);
  const [isGrowthPlanSubmitting, setIsGrowthPlanSubmitting] = useState(false);
  const goTo = (path: string) => window.location.assign(path);
  const jumpToContact = () => {
    setActiveTray("Inquiry");
    goTo("/contact");
  };
  const goToContact = () => goTo("/contact");
  const openConsultation = () => window.location.assign(approvedContact.whatsappUrl);
  const openFastTrack = (action: string) => {
    setActiveTray(action);
    if (action === "Call") window.location.assign(`tel:${approvedContact.phoneE164}`);
    else if (action === "Chat") window.location.assign(approvedContact.whatsappUrl);
    else if (action === "Inquiry") goTo("/contact");
    else setActionMessage("Book a Call is currently unavailable. Please contact Boost Vertex on WhatsApp or use the enquiry form.");
  };
  const submitGrowthPlan = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    const firstName = String(values.get("firstName") ?? "").trim();
    const lastName = String(values.get("lastName") ?? "").trim();
    const workEmail = String(values.get("workEmail") ?? "").trim();
    const companyWebsite = String(values.get("companyWebsite") ?? "").trim();
    if (!firstName || !lastName || !workEmail.includes("@") || !companyWebsite) {
      setActionMessage("Please complete every field with a valid email and company website.");
      return;
    }
    setIsGrowthPlanSubmitting(true);
    setActionMessage("");
    try {
      await contactService.submitGrowthPlan({ firstName, lastName, workEmail, companyWebsite });
      event.currentTarget.reset();
      window.location.assign("/thank-you");
    } catch (error) {
      setActionMessage(error instanceof Error ? error.message : "Your request could not be sent. Please try again or use the Contact page.");
    } finally {
      setIsGrowthPlanSubmitting(false);
    }
  };

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('.Main > [data-node-id]:not([data-node-id="46-556"])'));
    if (!sections.length || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    sections.forEach((section) => section.classList.add('reveal-section'));
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let active = true;
    contentService.listTestimonials().then((response) => {
      if (!active || !response.data.length) return;
      setTestimonials(response.data.map((item, index) => mergeTestimonial(clientTestimonials[index] ?? {
        id: item.id,
        name: item.name,
        role: item.role,
        quote: item.quote,
        image: item.image,
      }, item)));
    }).catch(() => {
      if (active) setTestimonials(clientTestimonials);
    });
    return () => { active = false; };
  }, []);

  return (
    <div id="top" data-layer="(Desktop)" data-node-id="46-510" className="Desktop w-[1280px] relative bg-[#121414] inline-flex flex-col justify-start items-start">
      <MarketingHeader />
  <div data-layer="Aside - SideNavBar" data-node-id="46-530" className="AsideSidenavbar h-[319px] py-4 left-[1210px] top-[240.50px] absolute bg-[#1a1c1c]/90 rounded-full shadow-[0px_0px_20px_0px_rgba(171,214,0,0.15)] outline outline-1 outline-offset-[-1px] outline-[#292a2a] backdrop-blur-md flex flex-col justify-start items-center gap-4">
    <div data-layer="Margin" data-node-id="46-531" className="Margin self-stretch pb-2 flex flex-col justify-start items-start">
      <div data-layer="HorizontalBorder" data-node-id="46-532" className="Horizontalborder self-stretch px-4 pb-2 border-b border-[#292a2a] flex flex-col justify-start items-start">
        <div data-layer="Container" data-node-id="46-533" className="Container self-stretch flex flex-col justify-start items-center">
          <div data-layer="Text" data-node-id="46-534" className="Text text-center justify-center text-[#c3f400] text-xs font-semibold font-['Inter']">Fast Track</div>
        </div>
      </div>
    </div>
    <button type="button" aria-label="Call Boost Vertex" aria-pressed={activeTray === "Call"} onClick={() => openFastTrack("Call")} data-layer="Button - Call" data-node-id="46-535" className={`ButtonCall p-3 relative rounded-full inline-flex justify-center items-center ${activeTray === "Call" ? "is-active" : ""}`}>
      <div data-layer="Container" data-node-id="46-536" className="Container inline-flex flex-col justify-start items-center">
        <img data-layer="Icon" data-node-id="46-537" className="Icon w-[18px] h-[18px]" src="/46-537.svg" />
      </div>
      <div data-layer="Background+Border" data-node-id="46-538" className="BackgroundBorder w-[46.21px] px-3 py-1 left-[-60.20px] top-[13px] absolute opacity-0 bg-[#1a1c1c] rounded-lg outline outline-1 outline-offset-[-1px] outline-[#292a2a] inline-flex flex-col justify-start items-center">
        <div data-layer="Text" data-node-id="46-539" className="Text text-center justify-center text-[#c4c9ac] text-xs font-semibold font-['Inter']">Call</div>
      </div>
    </button>
    <button type="button" aria-label="Chat with Boost Vertex" aria-pressed={activeTray === "Chat"} onClick={() => openFastTrack("Chat")} data-layer="Button - Chat" data-node-id="46-540" className={`ButtonChat p-3 relative rounded-full inline-flex justify-center items-center ${activeTray === "Chat" ? "is-active" : ""}`}>
      <div data-layer="Container" data-node-id="46-541" className="Container inline-flex flex-col justify-start items-center">
        <img data-layer="Icon" data-node-id="46-542" className="Icon w-5 h-5" src="/46-542.svg" />
      </div>
      <div data-layer="Background+Border" data-node-id="46-543" className="BackgroundBorder w-[53.26px] px-3 py-1 left-[-67.92px] top-[13px] absolute opacity-0 bg-[#1a1c1c] rounded-lg outline outline-1 outline-offset-[-1px] outline-[#292a2a] inline-flex flex-col justify-start items-center">
        <div data-layer="Text" data-node-id="46-544" className="Text text-center justify-center text-[#c4c9ac] text-xs font-semibold font-['Inter']">Chat</div>
      </div>
    </button>
    <button type="button" aria-label="Book a Boost Vertex strategy call" aria-pressed={activeTray === "Book"} onClick={() => openFastTrack("Book")} data-layer="Button - Book" data-node-id="46-545" className={`ButtonBook p-3 relative rounded-full inline-flex justify-center items-center ${activeTray === "Book" ? "is-active" : ""}`}>
      <div data-layer="Container" data-node-id="46-546" className="Container inline-flex flex-col justify-start items-center">
        <img data-layer="Icon" data-node-id="46-547" className="Icon w-[18px] h-5" src="/46-547.svg" />
      </div>
      <div data-layer="Background+Border" data-node-id="46-548" className="BackgroundBorder w-[52.62px] px-3 py-1 left-[-66.61px] top-[13px] absolute opacity-0 bg-[#1a1c1c] rounded-lg outline outline-1 outline-offset-[-1px] outline-[#292a2a] inline-flex flex-col justify-start items-center">
        <div data-layer="Text" data-node-id="46-549" className="Text text-center justify-center text-[#c4c9ac] text-xs font-semibold font-['Inter']">Book</div>
      </div>
    </button>
    <button type="button" aria-label="Send an inquiry to Boost Vertex" aria-pressed={activeTray === "Inquiry"} onClick={() => openFastTrack("Inquiry")} data-layer="Button - Inquiry" data-node-id="46-550" className={`ButtonInquiry p-3 relative rounded-full inline-flex justify-center items-center ${activeTray === "Inquiry" ? "is-active" : ""}`}>
      <div data-layer="Container" data-node-id="46-551" className="Container inline-flex flex-col justify-start items-center">
        <img data-layer="Icon" data-node-id="46-552" className="Icon w-5 h-4" src="/46-552.svg" />
      </div>
      <div data-layer="Background+Border" data-node-id="46-553" className="BackgroundBorder w-[68.78px] px-3 py-1 left-[-83.44px] top-[13px] absolute opacity-0 bg-[#1a1c1c] rounded-lg outline outline-1 outline-offset-[-1px] outline-[#292a2a] inline-flex flex-col justify-start items-center">
        <div data-layer="Text" data-node-id="46-554" className="Text text-center justify-center text-[#c4c9ac] text-xs font-semibold font-['Inter']">Inquiry</div>
      </div>
    </button>
  </div>
  <div data-layer="Main" data-node-id="46-555" className="Main self-stretch h-[6892.64px] relative overflow-hidden">
    <div data-layer="Hero Section" data-node-id="46-556" className="HeroSection w-[1280px] min-h-[921px] pt-[173.30px] pb-[141.31px] left-0 top-0 absolute inline-flex justify-center items-center">
      <div data-layer="Background Animation" data-node-id="46-557" className="BackgroundAnimation w-[1280px] h-[921px] left-0 top-0 absolute bg-gradient-to-b from-[#121414]/60 via-[#121414]/80 to-[#121414]" />
      <div data-layer="Container" data-node-id="46-558" className="Container flex-1 h-[606.39px] max-w-[1280px] px-10 inline-flex flex-col justify-start items-start">
          <div data-layer="Hero Content" data-node-id="46-559" className="HeroContent self-stretch h-[606.39px] relative">
          <div className="mobile-hero-heading" aria-hidden="true">Performance marketing<br/>built around Meta Ads<br/>and <span className="hero-gradient-text">qualified leads.</span></div>
          <div className="mobile-hero-copy" aria-hidden="true">Helping businesses across Pakistan, the UAE and Saudi Arabia acquire customers through data-driven paid advertising.</div>
          <div data-layer="Heading 1" data-node-id="46-560" className="Heading1 w-[690px] left-0 top-0 absolute inline-flex flex-col justify-start items-start">
            <div data-layer="Text" data-node-id="46-561" className="Text justify-center text-white text-7xl font-extrabold font-['Chivo']">Performance marketing<br/>built around Meta Ads<br/>and <span className="hero-gradient-text">qualified leads.</span></div>
          </div>
          <div data-layer="Container" data-node-id="46-562" className="Container w-full max-w-[672px] pb-[0.60px] left-0 top-[300.79px] absolute inline-flex flex-col justify-start items-start">
            <div data-layer="Text" data-node-id="46-563" className="Text justify-center text-[#c4c9ac] text-lg font-normal font-['Inter']">Boost Vertex helps businesses across Pakistan, the UAE and Saudi Arabia acquire customers through Meta Ads, lead generation, and data-driven paid advertising — with a focus on results that matter.</div>
          </div>
          <div data-layer="Margin" data-node-id="46-564" className="Margin w-[690px] pt-4 left-0 top-[420.39px] absolute inline-flex flex-col justify-start items-start">
            <div data-layer="Container" data-node-id="46-565" className="Container self-stretch inline-flex justify-start items-start gap-4">
              <div role="button" tabIndex={0} onClick={openConsultation} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") openConsultation(); }} data-action="free-consultation-whatsapp" data-layer="Button" data-node-id="46-566" className="Button px-8 py-[17px] bg-[#c3f400] rounded-lg inline-flex flex-col justify-center items-center">
                <div data-layer="Text" data-node-id="46-567" className="Text text-center justify-center text-[#121414] text-base font-bold font-['Inter']">Get a Free Consultation</div>
              </div>
              <div role="button" tabIndex={0} onClick={goToContact} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") goToContact(); }} data-action="discuss-project" data-layer="Button" data-node-id="46-568" className="Button px-8 py-4 rounded-lg outline outline-1 outline-offset-[-1px] outline-[#292a2a] inline-flex flex-col justify-center items-center">
                <div data-layer="Text" data-node-id="46-569" className="Text text-center justify-center text-white text-base font-semibold font-['Inter']">Discuss Your Project</div>
              </div>
            </div>
          </div>
          <div data-layer="Margin" data-node-id="46-570" className="Margin w-[690px] pt-8 left-0 top-[526.39px] absolute inline-flex flex-col justify-start items-start">
            <div data-layer="Container" data-node-id="46-571" className="Container self-stretch inline-flex justify-start items-center gap-4">
              <div data-layer="Container" data-node-id="46-572" className="Container flex justify-start items-start">
                <img data-layer="AB6AXuAnP5Nx9oM9ioPs5rW0tc0FHM9bZRipeNU5KA-ETTQpQBC3l9xjOaAFOQNQ2bqdHzMzsd6YOOkoGp43f1tyWtbgToPe1aPceASchnda-lcE8BEqCo8QRvwuzwIi41KP-OiGEdCIN6hklesTR5mmrVKvKjDUNDtrGdAzcPwEHU_anLAbIFssxXZho7JJBt7GZOMbgtAFaJbi6NBhcahwmV38IfYjvpZ55vnwWnP8NYoIRx1QooTJPn1J6g" data-node-id="46-573" className="Ab6axuanp5nx9om9iops5rw0tc0fhm9bzripenu5kaEttqpqbc3l9xjoaafoqnq2bqdhzmzsd6yookogp43f1tywtbgtope1apceaschndaLce8beqco8qrvwuzwii41kpOigedcin6hklestr5mmrvkvkjdundtrgdazcpwehuAnlabifssxxzho7jjbt7gzombgtafajbi6nbhcahwmv38ifyjvpz55vnwwnp8nyoirx1qootjpn1j6g w-12 h-12 opacity-80 rounded-full" src="/46-573.webp" />
                <div data-layer="Img:margin" data-node-id="46-574" className="ImgMargin w-12 h-12 inline-flex flex-col justify-start items-start">
                  <img data-layer="AB6AXuDGF8DCRKNamUrQWiIURQxg8g1YM9q6p9hxESitiObSMAUeDVfV_YteuHQTKtG5PldvN0JYK9UwNI8HcrpFRcBmGjzMZ4luBrIdkCq8DZAgiWDxXoxmBeihNZFICYcNcJwksQEZgCncxOuVlBJbraeq3A6ByaHdGzL4u2BX1UXwL-_mIF9G46-OhjsKQnlcj07CIsV0zQx8NhstztqSjpEuBQW82ql5U3ULhUSEKczwnEZ8URefArtHmQ" data-node-id="46-575" className="Ab6axudgf8dcrknamurqwiiurqxg8g1ym9q6p9hxesitiobsmauedvfvYteuhqtktg5pldvn0jyk9uwni8hcrpfrcbmgjzmz4lubridkcq8dzagiwdxxoxmbeihnzficycncjwksqezgcncxouvlbjbraeq3a6byahdgzl4u2bx1uxwlMif9g46Ohjskqnlcj07cisv0zqx8nhstztqsjpeubqw82ql5u3ulhusekczwnez8urefarthmq w-12 h-12 opacity-80 rounded-full" src="/46-575.webp" />
                </div>
                <div data-layer="Img:margin" data-node-id="46-576" className="ImgMargin w-12 h-12 inline-flex flex-col justify-start items-start">
                  <img data-layer="AB6AXuAgYjxNHgii3WxFLzgSlASlyWTyEaJ7gHyLEFiRsgZKGG103pqyFaKR9UW4AQd06sGvH4DwrpjmtHm8-13z-nbI-4Jy9L0dlVknxWPBVkrJYgXLeO30rFZqIqwH_RM39gT-I_PI748mizhOB8ATJTFbm5WJ8T4pC1CqBTSUXfhMGFyBCZhTabQ5zHwlcSPj_JYb0ahIf2-hL9KfLvA6Y42RfhMg4gCbMc3g-vikRFlxmH4Js5cdS1WbnA" data-node-id="46-577" className="Ab6axuagyjxnhgii3wxflzgslaslywtyeaj7ghylefirsgzkgg103pqyfakr9uw4aqd06sgvh4dwrpjmthm813zNbi4jy9l0dlvknxwpbvkrjygxleo30rfzqiqwhRm39gtIPi748mizhob8atjtfbm5wj8t4pc1cqbtsuxfhmgfybczhtabq5zhwlcspjJyb0ahif2Hl9kflva6y42rfhmg4gcbmc3gVikrflxmh4js5cds1wbna w-12 h-12 opacity-80 rounded-full" src="/46-577.webp" />
                </div>
              </div>
              <div data-layer="Container" data-node-id="46-578" className="Container inline-flex flex-col justify-start items-start">
                <div data-layer="Container" data-node-id="46-579" className="Container self-stretch flex flex-col justify-start items-start">
                  <div data-layer="Text" data-node-id="46-580" className="Text justify-center text-white text-base font-bold font-['Inter']">Performance Marketing</div>
                </div>
                <div data-layer="Container" data-node-id="46-581" className="Container self-stretch flex flex-col justify-start items-start">
                  <div data-layer="Text" data-node-id="46-582" className="Text justify-center text-[#c4c9ac] text-xs font-semibold font-['Inter']">Pakistan · UAE · Saudi Arabia</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div data-layer="Hero Form &amp; Viz" data-node-id="46-583" className="HeroFormViz self-stretch relative inline-flex flex-col justify-start items-start">
          <div data-layer="Gradient+Border" data-node-id="46-584" className="GradientBorder w-[518px] h-[441.19px] left-[-16px] top-[-16px] absolute bg-gradient-to-l from-[#c3f400]/10 to-[#c3f400]/0 rounded-3xl border border-[#c3f400]/20" />
          <div data-layer="Background+Border" data-node-id="46-585" className="BackgroundBorder self-stretch p-8 bg-[#1a1c1c] rounded-xl outline outline-1 outline-offset-[-1px] outline-[#292a2a] flex flex-col justify-start items-start gap-6">
            <div data-layer="Container" data-node-id="46-586" className="Container self-stretch flex flex-col justify-start items-start gap-2">
              <div data-layer="Heading 3" data-node-id="46-587" className="Heading3 self-stretch flex flex-col justify-start items-start">
                <div data-layer="Accelerate Growth" data-node-id="46-588" className="AccelerateGrowth self-stretch justify-center text-white text-2xl font-bold font-['Manrope']">Discuss Your Project</div>
              </div>
              <div data-layer="Container" data-node-id="46-589" className="Container self-stretch flex flex-col justify-start items-start">
                <div data-layer="Get your custom performance marketing roadmap today." data-node-id="46-590" className="GetYourCustomPerformanceMarketingRoadmapToday self-stretch justify-center text-[#c4c9ac] text-sm font-normal font-['Inter']">Tell us about your goals and the service you need.</div>
              </div>
            </div>
            <form data-layer="Form" data-node-id="46-591" className="Form self-stretch flex flex-col justify-start items-start gap-4" onSubmit={submitGrowthPlan} noValidate>
              <div data-layer="Container" data-node-id="46-592" className="Container self-stretch inline-flex justify-center items-start gap-4">
                <input type="text" name="firstName" placeholder="First Name" aria-label="First Name" autoComplete="given-name" required onInvalid={(event) => { event.currentTarget.setCustomValidity(event.currentTarget.validity.valueMissing ? "Please enter your first name before submitting." : ""); }} onInput={(event) => event.currentTarget.setCustomValidity("")} data-layer="Input" data-node-id="46-593" className="Input flex-1 px-4 py-3.5 rounded-lg outline outline-1 outline-offset-[-1px] outline-[#292a2a] inline-flex flex-col justify-start items-start overflow-hidden" />
                <input type="text" name="lastName" placeholder="Last Name" aria-label="Last Name" autoComplete="family-name" required onInvalid={(event) => { event.currentTarget.setCustomValidity(event.currentTarget.validity.valueMissing ? "Please enter your last name before submitting." : ""); }} onInput={(event) => event.currentTarget.setCustomValidity("")} data-layer="Input" data-node-id="46-596" className="Input flex-1 px-4 py-3.5 rounded-lg outline outline-1 outline-offset-[-1px] outline-[#292a2a] inline-flex flex-col justify-start items-start overflow-hidden" />
              </div>
              <input type="email" name="workEmail" placeholder="Work Email" aria-label="Work Email" autoComplete="email" required onInvalid={(event) => { event.currentTarget.setCustomValidity(event.currentTarget.validity.valueMissing ? "Please enter your work email before submitting." : event.currentTarget.validity.typeMismatch ? "Please enter a valid work email address." : ""); }} onInput={(event) => event.currentTarget.setCustomValidity("")} data-layer="Input" data-node-id="46-599" className="Input self-stretch px-4 py-3.5 rounded-lg outline outline-1 outline-offset-[-1px] outline-[#292a2a] flex flex-col justify-start items-start overflow-hidden" />
              <input type="url" name="companyWebsite" placeholder="Company Website" aria-label="Company Website" autoComplete="url" required onInvalid={(event) => { event.currentTarget.setCustomValidity(event.currentTarget.validity.valueMissing ? "Please enter your company website before submitting." : event.currentTarget.validity.typeMismatch ? "Please enter a valid website URL, for example https://example.com." : ""); }} onInput={(event) => event.currentTarget.setCustomValidity("")} data-layer="Input" data-node-id="46-602" className="Input self-stretch px-4 py-3.5 rounded-lg outline outline-1 outline-offset-[-1px] outline-[#292a2a] flex flex-col justify-start items-start overflow-hidden" />
              <div data-layer="Button:margin" data-node-id="46-605" className="ButtonMargin self-stretch pt-2 flex flex-col justify-start items-start">
                <button type="submit" disabled={isGrowthPlanSubmitting} data-action="submit-growth-plan" data-layer="Button" data-node-id="46-606" className="Button self-stretch px-8 py-4 bg-[#c3f400] rounded-lg flex flex-col justify-center items-center">
              <div data-layer="Boost Your Business Now" data-node-id="46-607" className="BoostYourBusinessNow text-center justify-center text-[#121414] text-base font-bold font-['Inter']">{isGrowthPlanSubmitting ? "Sending Request..." : "Continue to Enquiry Form"}</div>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <img className="mobile-hero-vector" src="/45-2.svg" aria-hidden="true" />
      <img data-layer="Vector" data-node-id="46-1622" className="Vector w-[1291px] h-[695px] left-0 top-[17px] absolute origin-top-left rotate-180 opacity-20" src="/46-1622.svg" />
    </div>
    <div id="services" data-layer="Section - Client Logo Strip" data-node-id="46-608" className="SectionClientLogoStrip w-[1280px] py-8 left-0 top-[921px] absolute bg-[#1a1c1c]/50 border-t border-b border-[#292a2a] inline-flex flex-col justify-start items-start">
      <div data-layer="Container" data-node-id="46-609" className="Container w-full max-w-[1280px] px-10 flex flex-col justify-start items-center gap-6">
        <div data-layer="Container" data-node-id="46-610" className="Container flex flex-col justify-start items-start">
          <div data-layer="Text" data-node-id="46-611" className="Text justify-center text-[#c4c9ac] text-xs font-semibold font-['Inter'] uppercase">TRUSTED BY AMBITIOUS BUSINESSES</div>
        </div>
        <div data-layer="Background" data-node-id="46-612" className="Background opacity-50 bg-blend-saturation bg-white inline-flex justify-center items-start gap-16">
          <div data-layer="Approved client references" data-node-id="46-613" className="PlaceholderLogosUsingCssToSimulateTextBasedLogos self-stretch inline-flex flex-col justify-start items-start">
            <div data-layer="MovePro Pakistan" data-node-id="46-614" className="DarazPakistan justify-center text-[#e3e2e2] text-2xl font-bold font-['Inter']">MovePro Pakistan</div>
          </div>
          <div data-layer="Container" data-node-id="46-615" className="Container self-stretch inline-flex flex-col justify-start items-start">
            <div data-layer="Dr. Waqas Ahmad / Homoeopathic Centre Medicare" data-node-id="46-616" className="Nestle justify-center text-[#e3e2e2] text-lg font-normal font-['Inter']">Dr. Waqas Ahmad / Homoeopathic Centre Medicare</div>
          </div>
          <div data-layer="Container" data-node-id="46-617" className="Container self-stretch inline-flex flex-col justify-start items-start">
            <div data-layer="Whizpool" data-node-id="46-618" className="Careem justify-center text-[#e3e2e2] text-2xl font-black font-['Inter']">Whizpool</div>
          </div>
          <div data-layer="Container" data-node-id="46-619" className="Container self-stretch inline-flex flex-col justify-start items-start">
            <div data-layer="AH Interior" data-node-id="46-620" className="Unilever justify-center text-[#e3e2e2] text-2xl font-semibold font-['Inter']">AH Interior</div>
          </div>
          <div data-layer="Container" data-node-id="46-621" className="Container self-stretch inline-flex flex-col justify-start items-start">
            <div data-layer="Mr. Ali — Software Company" data-node-id="46-622" className="Toyota justify-center text-[#e3e2e2] text-lg font-normal font-['Inter']">Mr. Ali — Software Company</div>
          </div>
        </div>
      </div>
    </div>
    <div data-layer="Section - Services Overview" data-node-id="46-625" className="SectionServicesOverview w-[1280px] max-w-[1280px] px-10 py-12 left-0 top-[1059px] absolute inline-flex flex-col justify-start items-start gap-12">
      <div data-layer="Container" data-node-id="46-626" className="Container self-stretch flex flex-col justify-start items-start gap-4">
        <div data-layer="Heading 2" data-node-id="46-627" className="Heading2 self-stretch flex flex-col justify-start items-start">
          <div data-layer="Everything you need to move the needle." data-node-id="46-628" className="EverythingYouNeedToMoveTheNeedle self-stretch justify-center text-white text-5xl font-bold font-['Chivo']">Performance marketing built to acquire customers.</div>
        </div>
        <div data-layer="Container" data-node-id="46-629" className="Container w-[768px] max-w-[768px] flex flex-col justify-start items-start">
          <div data-layer="Text" data-node-id="46-630" className="Text justify-center text-[#c4c9ac] text-base font-normal font-['Inter']">Meta Ads and lead generation are our core specialties, supported by search, video, SEO, and conversion-ready web development.</div>
        </div>
      </div>
      <div data-layer="Container" data-node-id="46-631" className="Container self-stretch inline-flex flex-col justify-start items-start">
        <div data-layer="Service Card 1: Meta Ads (Prominent)" data-node-id="46-632" className="ServiceCard1MetaAdsProminent self-stretch p-6 relative bg-[#1a1c1c] rounded-xl shadow-[0px_0px_15px_0px_rgba(171,214,0,0.10)] outline outline-1 outline-offset-[-1px] outline-[#292a2a] inline-flex flex-col justify-start items-start gap-6 overflow-hidden">
          <div data-layer="Overlay+Blur" data-node-id="46-633" className="OverlayBlur w-32 h-32 left-[499px] top-[-39px] absolute bg-[#c3f400]/10 rounded-full blur-[20px]" />
          <div data-layer="Paragraph" data-node-id="46-634" className="Paragraph self-stretch inline-flex justify-between items-start">
            <img data-layer="Icon" data-node-id="46-635" className="Icon w-5 h-4" src="/46-635.svg" />
            <div data-layer="Text" data-node-id="46-636" className="Text justify-center text-[#c4c9ac]/50 text-xl font-bold font-mono">01</div>
          </div>
          <div data-layer="Heading 3" data-node-id="46-637" className="Heading3 self-stretch flex flex-col justify-start items-start">
            <div data-layer="Meta Ads / Paid Social" data-node-id="46-638" className="MetaAdsPaidSocial self-stretch justify-center text-white text-2xl font-bold font-['Chivo']">Meta Ads / Paid Social</div>
          </div>
          <div data-layer="Container" data-node-id="46-639" className="Container self-stretch flex flex-col justify-start items-start">
            <div data-layer="Facebook and Instagram advertising built for customer acquisition" data-node-id="46-640" className="PrecisionTargetingAcrossSocialChannelsToDriveHighIntentTrafficAndMaximizeRoasWithCompellingCreative self-stretch justify-center text-[#c4c9ac] text-base font-normal font-['Inter']">Facebook and Instagram advertising built for customer acquisition,<br/>from audience research to conversion tracking.</div>
          </div>
          <div data-layer="Button:margin" data-node-id="46-641" className="ButtonMargin pt-4 flex flex-col justify-start items-start">
              <div role="button" tabIndex={0} onClick={openConsultation} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") openConsultation(); }} data-layer="Button" data-node-id="46-642" className="Button px-8 py-4 bg-[#c3f400] rounded-lg flex flex-col justify-center items-center">
              <div data-layer="Text" data-node-id="46-643" className="Text text-center justify-center text-[#121414] text-sm font-bold font-['Inter']">Get a Free Consultation</div>
            </div>
          </div>
          <div role="link" tabIndex={0} onClick={() => goTo("/services/meta-ads-management")} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") goTo("/services/meta-ads-management"); }} data-layer="Link" data-node-id="46-644" className="Link self-stretch inline-flex justify-start items-center gap-2">
            <div data-layer="Text" data-node-id="46-645" className="Text justify-center text-[#c3f400] text-sm font-bold font-['Inter']">Explore Service</div>
            <div data-layer="Container" data-node-id="46-646" className="Container inline-flex flex-col justify-start items-start">
              <img data-layer="Icon" data-node-id="46-647" className="Icon w-4 h-4" src="/46-647.svg" />
            </div>
          </div>
        </div>
        <div data-layer="Service Card 2: Lead Generation (Prominent)" data-node-id="46-648" className="ServiceCard2LeadGenerationProminent self-stretch p-6 relative bg-[#1a1c1c] rounded-xl shadow-[0px_0px_15px_0px_rgba(171,214,0,0.10)] outline outline-1 outline-offset-[-1px] outline-[#292a2a] inline-flex flex-col justify-start items-start gap-6 overflow-hidden">
          <img data-layer="Overlay+Blur" data-node-id="46-649" className="OverlayBlur w-[371.01px] h-[524.50px] left-[498.99px] top-[-39px] absolute rounded-full blur-[20px]" src="/46-649.svg" />
          <div data-layer="Paragraph" data-node-id="46-650" className="Paragraph self-stretch inline-flex justify-between items-start">
            <img data-layer="Icon" data-node-id="46-651" className="Icon w-6 h-4" src="/46-651.svg" />
            <div data-layer="Text" data-node-id="46-652" className="Text justify-center text-[#c4c9ac]/50 text-xl font-bold font-mono">02</div>
          </div>
          <div data-layer="Heading 3" data-node-id="46-653" className="Heading3 self-stretch flex flex-col justify-start items-start">
            <div data-layer="Lead Generation" data-node-id="46-654" className="LeadGeneration self-stretch justify-center text-white text-2xl font-bold font-['Chivo']">Lead Generation</div>
          </div>
          <div data-layer="Container" data-node-id="46-655" className="Container self-stretch flex flex-col justify-start items-start">
            <div data-layer="Qualified lead-generation campaigns focused on relevance and conversion potential" data-node-id="46-656" className="EndToEndFunnelOptimizationDesignedToCaptureNurtureAndConvertHighlyQualifiedLeadsForYourSalesTeam self-stretch justify-center text-[#c4c9ac] text-base font-normal font-['Inter']">Qualified lead-generation campaigns focused on relevance and<br/>conversion potential, not just volume.</div>
          </div>
          <div data-layer="Button:margin" data-node-id="46-657" className="ButtonMargin pt-4 flex flex-col justify-start items-start">
              <div role="button" tabIndex={0} onClick={openConsultation} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") openConsultation(); }} data-layer="Button" data-node-id="46-658" className="Button px-8 py-4 bg-[#c3f400] rounded-lg flex flex-col justify-center items-center">
              <div data-layer="Text" data-node-id="46-659" className="Text text-center justify-center text-[#121414] text-sm font-bold font-['Inter']">Get a Free Consultation</div>
            </div>
          </div>
          <div role="link" tabIndex={0} onClick={() => goTo("/services/lead-generation")} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") goTo("/services/lead-generation"); }} data-layer="Link" data-node-id="46-660" className="Link self-stretch inline-flex justify-start items-center gap-2">
            <div data-layer="Text" data-node-id="46-661" className="Text justify-center text-[#c3f400] text-sm font-bold font-['Inter']">Explore Service</div>
            <div data-layer="Container" data-node-id="46-662" className="Container inline-flex flex-col justify-start items-start">
              <img data-layer="Icon" data-node-id="46-663" className="Icon w-4 h-4" src="/46-663.svg" />
            </div>
          </div>
        </div>
        <div data-layer="Service Card 3: SEO" data-node-id="46-664" className="ServiceCard3Seo self-stretch p-6 relative bg-[#1a1c1c] rounded-xl outline outline-1 outline-offset-[-1px] outline-[#292a2a] inline-flex flex-col justify-start items-start gap-6 overflow-hidden">
          <div data-layer="Paragraph" data-node-id="46-665" className="Paragraph self-stretch inline-flex justify-between items-start">
            <img data-layer="Icon" data-node-id="46-666" className="Icon w-[18px] h-[18px]" src="/46-666.svg" />
            <div data-layer="Text" data-node-id="46-667" className="Text justify-center text-[#c4c9ac]/50 text-xl font-bold font-mono">03</div>
          </div>
          <div data-layer="Heading 3" data-node-id="46-668" className="Heading3 self-stretch flex flex-col justify-start items-start">
            <div data-layer="SEO" data-node-id="46-669" className="SeoStrategy self-stretch justify-center text-white text-2xl font-bold font-['Manrope']">SEO</div>
          </div>
          <div data-layer="Container" data-node-id="46-670" className="Container self-stretch flex flex-col justify-start items-start">
            <div data-layer="Search engine optimization focused on organic visibility" data-node-id="46-671" className="DominateSearchResultsWithTechnicalPrecisionAndAuthoritativeContentStructuresThatDriveCompoundingOrganicGrowth self-stretch justify-center text-[#c4c9ac] text-base font-normal font-['Inter']">Search engine optimization focused on organic visibility<br/>that supports conversion, not just rankings.</div>
          </div>
          <div data-layer="Button:margin" data-node-id="46-672" className="ButtonMargin pt-4 flex flex-col justify-start items-start">
              <div role="button" tabIndex={0} onClick={openConsultation} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") openConsultation(); }} data-layer="Button" data-node-id="46-673" className="Button px-8 py-4 bg-[#c3f400] rounded-lg flex flex-col justify-center items-center">
              <div data-layer="Text" data-node-id="46-674" className="Text text-center justify-center text-[#121414] text-sm font-bold font-['Inter']">Get a Free Consultation</div>
            </div>
          </div>
          <div role="link" tabIndex={0} onClick={() => goTo("/services/seo")} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") goTo("/services/seo"); }} data-layer="Link" data-node-id="46-675" className="Link self-stretch inline-flex justify-start items-center gap-2">
            <div data-layer="Text" data-node-id="46-676" className="Text justify-center text-[#c3f400] text-sm font-bold font-['Inter']">Explore Service</div>
            <div data-layer="Container" data-node-id="46-677" className="Container inline-flex flex-col justify-start items-start">
              <img data-layer="Icon" data-node-id="46-678" className="Icon w-4 h-4" src="/46-678.svg" />
            </div>
          </div>
          <div data-layer="Overlay+Blur" data-node-id="46-1635" className="OverlayBlur w-32 h-32 left-[295px] top-[-35.19px] absolute bg-[#c3f400]/10 rounded-full blur-[20px]" />
        </div>
        <div data-layer="Service Card 4: Google Ads" data-node-id="46-679" className="ServiceCard4GoogleAds self-stretch p-6 relative bg-[#1a1c1c] rounded-xl outline outline-1 outline-offset-[-1px] outline-[#292a2a] inline-flex flex-col justify-start items-start gap-6 overflow-hidden">
          <div data-layer="Paragraph" data-node-id="46-680" className="Paragraph self-stretch inline-flex justify-between items-start">
            <img data-layer="Icon" data-node-id="46-681" className="Icon w-[20.50px] h-[20.50px]" src="/46-681.svg" />
            <div data-layer="Text" data-node-id="46-682" className="Text justify-center text-[#c4c9ac]/50 text-xl font-bold font-mono">04</div>
          </div>
          <div data-layer="Heading 3" data-node-id="46-683" className="Heading3 self-stretch flex flex-col justify-start items-start">
            <div data-layer="Google Ads" data-node-id="46-684" className="GoogleAdsPpc self-stretch justify-center text-white text-2xl font-bold font-['Manrope']">Google Ads</div>
          </div>
          <div data-layer="Container" data-node-id="46-685" className="Container self-stretch pb-6 flex flex-col justify-start items-start">
            <div data-layer="Search advertising targeting high-intent customers" data-node-id="46-686" className="CaptureHighIntentSearchTrafficWithHyperOptimizedCampaignsFocusedOnDrivingTheLowestCpaPossible self-stretch justify-center text-[#c4c9ac] text-base font-normal font-['Inter']">Search advertising targeting high-intent customers<br/>actively searching for your product or service.</div>
          </div>
          <div data-layer="Button:margin" data-node-id="46-687" className="ButtonMargin pt-4 flex flex-col justify-start items-start">
              <div role="button" tabIndex={0} onClick={openConsultation} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") openConsultation(); }} data-layer="Button" data-node-id="46-688" className="Button px-8 py-4 bg-[#c3f400] rounded-lg flex flex-col justify-center items-center">
              <div data-layer="Text" data-node-id="46-689" className="Text text-center justify-center text-[#121414] text-sm font-bold font-['Inter']">Get a Free Consultation</div>
            </div>
          </div>
          <div role="link" tabIndex={0} onClick={() => goTo("/services/google-ads")} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") goTo("/services/google-ads"); }} data-layer="Link" data-node-id="46-690" className="Link self-stretch inline-flex justify-start items-center gap-2">
            <div data-layer="Text" data-node-id="46-691" className="Text justify-center text-[#c3f400] text-sm font-bold font-['Inter']">Explore Service</div>
            <div data-layer="Container" data-node-id="46-692" className="Container inline-flex flex-col justify-start items-start">
              <img data-layer="Icon" data-node-id="46-693" className="Icon w-4 h-4" src="/46-693.svg" />
            </div>
          </div>
          <div data-layer="Overlay+Blur" data-node-id="46-1633" className="OverlayBlur w-32 h-32 left-[295px] top-[-35.19px] absolute bg-[#c3f400]/10 rounded-full blur-[20px]" />
        </div>
        <div data-layer="Service Card 5: Web Design" data-node-id="46-694" className="ServiceCard5WebDesign self-stretch p-6 relative bg-[#1a1c1c] rounded-xl shadow-[0px_0px_15px_0px_rgba(171,214,0,0.10)] outline outline-1 outline-offset-[-1px] outline-[#292a2a] inline-flex flex-col justify-start items-start gap-6 overflow-hidden">
          <div data-layer="Overlay+Blur" data-node-id="46-1626" className="OverlayBlur w-32 h-32 left-[295px] top-[-35.19px] absolute bg-[#c3f400]/10 rounded-full blur-[20px]" />
          <div data-layer="Overlay+Blur" data-node-id="46-1629" className="OverlayBlur w-32 h-32 left-[499px] top-[-39.19px] absolute bg-[#c3f400]/10 rounded-full blur-[20px]" />
          <div data-layer="Paragraph" data-node-id="46-695" className="Paragraph self-stretch inline-flex justify-between items-start">
            <img data-layer="Icon" data-node-id="46-696" className="Icon w-5 h-4" src="/46-696.svg" />
            <div data-layer="Text" data-node-id="46-697" className="Text justify-center text-[#c4c9ac]/50 text-xl font-bold font-mono">05</div>
          </div>
          <div data-layer="Heading 3" data-node-id="46-698" className="Heading3 self-stretch flex flex-col justify-start items-start">
            <div data-layer="Web Development" data-node-id="46-699" className="WebDesign self-stretch justify-center text-white text-2xl font-bold font-['Manrope']">Web Development</div>
          </div>
          <div data-layer="Container" data-node-id="46-700" className="Container self-stretch pb-6 flex flex-col justify-start items-start">
            <div data-layer="Conversion-focused websites and landing pages" data-node-id="46-701" className="HighPerformanceConversionOptimizedDigitalExperiencesBuiltToTurnVisitorsIntoLeadsAndCustomers self-stretch justify-center text-[#c4c9ac] text-base font-normal font-['Inter']">Conversion-focused websites and landing pages<br/>built to support marketing campaigns.</div>
          </div>
          <div data-layer="Button:margin" data-node-id="46-702" className="ButtonMargin pt-4 flex flex-col justify-start items-start">
              <div role="button" tabIndex={0} onClick={openConsultation} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") openConsultation(); }} data-layer="Button" data-node-id="46-703" className="Button px-8 py-4 bg-[#c3f400] rounded-lg flex flex-col justify-center items-center">
              <div data-layer="Text" data-node-id="46-704" className="Text text-center justify-center text-[#121414] text-sm font-bold font-['Inter']">Get a Free Consultation</div>
            </div>
          </div>
          <div role="link" tabIndex={0} onClick={() => goTo("/services/web-development")} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") goTo("/services/web-development"); }} data-layer="Link" data-node-id="46-705" className="Link self-stretch inline-flex justify-start items-center gap-2">
            <div data-layer="Text" data-node-id="46-706" className="Text justify-center text-[#c3f400] text-sm font-bold font-['Inter']">Explore Service</div>
            <div data-layer="Container" data-node-id="46-707" className="Container inline-flex flex-col justify-start items-start">
              <img data-layer="Icon" data-node-id="46-708" className="Icon w-4 h-4" src="/46-708.svg" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div data-layer="Section - Why Choose Us" data-node-id="46-709" className="SectionWhyChooseUs w-[1280px] max-w-[1280px] px-10 pt-[47.29px] pb-12 left-0 top-[2062.97px] absolute inline-flex flex-col justify-start items-start gap-12">
      <div data-layer="Heading 2" data-node-id="46-710" className="Heading2 w-[672px] max-w-[672px] flex flex-col justify-start items-start">
        <div data-layer="Text" data-node-id="46-711" className="Text justify-center text-white text-5xl font-bold font-['Chivo']">Why businesses choose<br/>Boost Vertex.</div>
      </div>
      <div data-layer="Container" data-node-id="46-712" className="Container self-stretch inline-flex justify-center items-start gap-12">
        <div data-layer="Container" data-node-id="46-713" className="Container flex-1 inline-flex flex-col justify-start items-start gap-8">
          <div data-layer="Container" data-node-id="46-714" className="Container self-stretch inline-flex justify-start items-start gap-6">
            <div data-layer="Margin" data-node-id="46-715" className="Margin pt-1 inline-flex flex-col justify-start items-start">
              <div data-layer="Text" data-node-id="46-716" className="Text justify-center text-[#c3f400] text-xl font-bold font-mono">01</div>
            </div>
            <div data-layer="Container" data-node-id="46-717" className="Container inline-flex flex-col justify-start items-start gap-2">
              <div data-layer="Heading 3" data-node-id="46-718" className="Heading3 self-stretch flex flex-col justify-start items-start">
                <div data-layer="Text" data-node-id="46-719" className="Text justify-center text-white text-2xl font-bold font-['Chivo']">Outcomes over activity</div>
              </div>
              <div data-layer="Container" data-node-id="46-720" className="Container self-stretch flex flex-col justify-start items-start">
                <div data-layer="Text" data-node-id="46-721" className="Text justify-center text-[#c4c9ac] text-base font-normal font-['Inter']">We don't just deliver reports filled with vanity metrics. We measure<br/>our success by the actual business growth and ROI we generate for<br/>you.</div>
              </div>
            </div>
          </div>
          <div data-layer="Container" data-node-id="46-722" className="Container self-stretch inline-flex justify-start items-start gap-6">
            <div data-layer="Margin" data-node-id="46-723" className="Margin pt-1 inline-flex flex-col justify-start items-start">
              <div data-layer="Text" data-node-id="46-724" className="Text justify-center text-[#c3f400] text-xl font-bold font-mono">02</div>
            </div>
            <div data-layer="Container" data-node-id="46-725" className="Container inline-flex flex-col justify-start items-start gap-2">
              <div data-layer="Heading 3" data-node-id="46-726" className="Heading3 self-stretch flex flex-col justify-start items-start">
                <div data-layer="Text" data-node-id="46-727" className="Text justify-center text-white text-2xl font-bold font-['Chivo']">Strategy before spend</div>
              </div>
              <div data-layer="Container" data-node-id="46-728" className="Container self-stretch flex flex-col justify-start items-start">
                <div data-layer="Text" data-node-id="46-729" className="Text justify-center text-[#c4c9ac] text-base font-normal font-['Inter']">Every dollar spent is backed by rigorous data analysis and a cohesive<br/>strategy designed to maximize efficiency and impact across all<br/>channels.</div>
              </div>
            </div>
          </div>
          <div data-layer="Container" data-node-id="46-730" className="Container self-stretch inline-flex justify-start items-start gap-6">
            <div data-layer="Margin" data-node-id="46-731" className="Margin pt-1 inline-flex flex-col justify-start items-start">
              <div data-layer="Text" data-node-id="46-732" className="Text justify-center text-[#c3f400] text-xl font-bold font-mono">03</div>
            </div>
            <div data-layer="Container" data-node-id="46-733" className="Container inline-flex flex-col justify-start items-start gap-2">
              <div data-layer="Heading 3" data-node-id="46-734" className="Heading3 self-stretch flex flex-col justify-start items-start">
                <div data-layer="Text" data-node-id="46-735" className="Text justify-center text-white text-2xl font-bold font-['Chivo']">Transparent reporting</div>
              </div>
              <div data-layer="Container" data-node-id="46-736" className="Container self-stretch flex flex-col justify-start items-start">
                <div data-layer="Text" data-node-id="46-737" className="Text justify-center text-[#c4c9ac] text-base font-normal font-['Inter']">Full visibility into campaign performance, spend attribution, and<br/>strategic rationale. You always know exactly what we're doing and<br/>why.</div>
              </div>
            </div>
          </div>
          <div data-layer="Container" data-node-id="46-738" className="Container self-stretch inline-flex justify-start items-start gap-6">
            <div data-layer="Margin" data-node-id="46-739" className="Margin pt-1 inline-flex flex-col justify-start items-start">
              <div data-layer="Text" data-node-id="46-740" className="Text justify-center text-[#c3f400] text-xl font-bold font-mono">04</div>
            </div>
            <div data-layer="Container" data-node-id="46-741" className="Container inline-flex flex-col justify-start items-start gap-2">
              <div data-layer="Heading 3" data-node-id="46-742" className="Heading3 self-stretch flex flex-col justify-start items-start">
                <div data-layer="Text" data-node-id="46-743" className="Text justify-center text-white text-2xl font-bold font-['Chivo']">Continuous optimization</div>
              </div>
              <div data-layer="Container" data-node-id="46-744" className="Container self-stretch flex flex-col justify-start items-start">
                <div data-layer="Text" data-node-id="46-745" className="Text justify-center text-[#c4c9ac] text-base font-normal font-['Inter']">The digital landscape evolves constantly. We employ agile<br/>methodologies to rapidly test, learn, and iterate, ensuring your<br/>campaigns stay ahead of the curve.</div>
              </div>
            </div>
          </div>
        </div>
        <div data-layer="Border" data-node-id="46-746" className="Border flex-1 relative rounded-xl outline outline-1 outline-offset-[-1px] outline-[#292a2a] inline-flex flex-col justify-center items-start overflow-hidden">
          <img data-layer="Performance metrics bar graph" data-node-id="46-747" className="PerformanceMetricsBarGraph self-stretch h-[538.75px] opacity-90" src="/46-747.webp" />
          <div data-layer="Overlay+Shadow" data-node-id="46-748" className="OverlayShadow w-[574px] h-[538.75px] left-[1px] top-[1px] absolute bg-white/0 shadow-[inset_0px_0px_60px_0px_rgba(171,214,0,0.10)]" />
          <div data-layer="Gradient" data-node-id="46-749" className="Gradient w-[574px] h-[538.75px] left-[1px] top-[1px] absolute bg-gradient-to-l from-[#c3f400]/10 to-[#c3f400]/0" />
        </div>
      </div>
    </div>
    <div id="case-studies" data-layer="Section - Results / Case Studies" data-node-id="46-750" className="SectionResultsCaseStudies w-[1280px] py-12 left-0 top-[2862.91px] absolute bg-[#0d0e0f] border-t border-b border-[#292a2a] inline-flex flex-col justify-start items-start">
      <div data-layer="Container" data-node-id="46-751" className="Container w-full max-w-[1280px] px-10 flex flex-col justify-start items-start gap-12">
        <div data-layer="Heading 2" data-node-id="46-752" className="Heading2 self-stretch flex flex-col justify-start items-start">
          <div data-layer="Case studies" data-node-id="46-753" className="ResultsOurClientsCanPointTo self-stretch justify-center text-white text-5xl font-bold font-['Manrope']">Case studies.</div>
        </div>
        <div data-layer="Container" data-node-id="46-754" className="Container self-stretch inline-flex justify-center items-start gap-6">
          <div data-layer="Case Study 1" data-node-id="46-755" className="CaseStudy1 flex-1 p-6 bg-[#1a1c1c] rounded-xl outline outline-1 outline-offset-[-1px] outline-[#292a2a] inline-flex flex-col justify-start items-start gap-4">
            <div data-layer="Margin" data-node-id="46-756" className="Margin self-stretch pb-2 flex flex-col justify-start items-start">
              <div data-layer="Container" data-node-id="46-757" className="Container self-stretch inline-flex justify-start items-start">
                <div data-layer="Container" data-node-id="46-758" className="Container inline-flex flex-col justify-start items-start gap-1">
                  <div data-layer="Container" data-node-id="46-759" className="Container self-stretch flex flex-col justify-start items-start">
                    <div data-layer="Text" data-node-id="46-760" className="Text justify-center text-[#c3f400] text-base font-normal font-['Inter']">Transport &amp; Logistics</div>
                  </div>
                  <div data-layer="Heading 4" data-node-id="46-761" className="Heading4 self-stretch flex flex-col justify-start items-start">
                    <div data-layer="Text" data-node-id="46-762" className="Text justify-center text-white text-xl font-bold font-['Chivo']">MovePro Pakistan</div>
                  </div>
                </div>
              </div>
            </div>
            <div data-layer="Container" data-node-id="46-763" className="Container self-stretch flex flex-col justify-start items-start">
              <div data-layer="Challenge" data-node-id="46-764" className="ChallengeStagnantOrganicGrowthInAHighComplianceFinancialNiche self-stretch justify-center text-[#e3e2e2] text-sm font-bold font-['Inter']">Challenge: Unpredictable referral-led<br/>growth for a logistics business.</div>
            </div>
            <div data-layer="Container" data-node-id="46-765" className="Container self-stretch flex flex-col justify-start items-start">
              <div data-layer="Services" data-node-id="46-766" className="ServicesTechnicalSeoContentStrategy self-stretch justify-center text-[#e3e2e2] text-sm font-bold font-['Inter']">Services: Meta Ads, Lead Generation</div>
            </div>
            <div data-layer="Container" data-node-id="46-767" className="Container self-stretch flex flex-col justify-start items-start">
              <div data-layer="Strategy" data-node-id="46-768" className="StrategyTechnicalSeoOverhaulAuthorityDrivenContentClusters self-stretch justify-center text-[#e3e2e2] text-sm font-bold font-['Inter']">Strategy: Relevant audience targeting +<br/>ongoing campaign optimization.</div>
            </div>
            <div data-layer="Margin" data-node-id="46-769" className="Margin self-stretch py-2 flex flex-col justify-start items-start">
              <div data-layer="Border" data-node-id="46-770" className="Border self-stretch pt-4 pb-[17.50px] border-t border-b border-[#292a2a] flex flex-col justify-start items-start gap-1">
                <div data-layer="Container" data-node-id="46-771" className="Container self-stretch inline-flex justify-start items-center gap-2">
                  <div data-layer="Container" data-node-id="46-772" className="Container inline-flex flex-col justify-start items-start">
                    <img data-layer="Icon" data-node-id="46-773" className="Icon w-[22px] h-[21px]" src="/46-773.svg" />
                  </div>
                  <div data-layer="Container" data-node-id="46-774" className="Container inline-flex flex-col justify-start items-start">
                    <div data-layer="Text" data-node-id="46-775" className="Text justify-center text-[#c3f400] text-xs font-bold font-['Inter'] uppercase">KNOWN OUTCOME</div>
                  </div>
                </div>
                <div data-layer="Container" data-node-id="46-776" className="Container self-stretch pb-[2.50px] flex flex-col justify-start items-start">
                  <div data-layer="High-quality leads" data-node-id="46-777" className="340 self-stretch justify-center text-[#c3f400] text-[40px] font-bold font-['Chivo']">HIGH-QUALITY</div>
                </div>
                <div data-layer="Text" data-node-id="46-778" className="Text justify-center text-white text-sm font-bold font-['Inter']">Relevant Leads</div>
              </div>
            </div>
            <div data-layer="Margin" data-node-id="46-779" className="Margin self-stretch pb-4 flex flex-col justify-start items-start">
              <div data-layer="Container" data-node-id="46-780" className="Container self-stretch flex flex-col justify-start items-start">
                <div data-layer="Approved case study summary" data-node-id="46-781" className="BoostVertexFundamentallyShiftedOurAcquisitionModelTowardsHighlyQualifiedOrganicLeads self-stretch justify-center text-[#c4c9ac] text-sm font-normal font-['Inter']">High-quality and mature leads were generated<br/>through Meta Ads, with the client satisfied<br/>with the quality of prospects.</div>
              </div>
            </div>
            <div role="link" tabIndex={0} onClick={() => goTo("/case-studies/movepro-pakistan")} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") goTo("/case-studies/movepro-pakistan"); }} data-layer="Button" data-node-id="46-782" className="Button self-stretch px-8 py-4 rounded-lg outline outline-1 outline-offset-[-1px] outline-[#292a2a] flex flex-col justify-center items-center">
              <div data-layer="Text" data-node-id="46-783" className="Text text-center justify-center text-white text-sm font-semibold font-['Inter']">View Case Study →</div>
            </div>
          </div>
          <div data-layer="Case Study 2" data-node-id="46-784" className="CaseStudy2 flex-1 p-6 bg-[#1a1c1c] rounded-xl outline outline-1 outline-offset-[-1px] outline-[#292a2a] inline-flex flex-col justify-start items-start gap-4">
            <div data-layer="Margin" data-node-id="46-785" className="Margin self-stretch pb-2 flex flex-col justify-start items-start">
              <div data-layer="Container" data-node-id="46-786" className="Container self-stretch inline-flex justify-start items-start">
                <div data-layer="Container" data-node-id="46-787" className="Container inline-flex flex-col justify-start items-start gap-1">
                  <div data-layer="Container" data-node-id="46-788" className="Container self-stretch flex flex-col justify-start items-start">
                    <div data-layer="Text" data-node-id="46-789" className="Text justify-center text-[#c3f400] text-base font-normal font-['Inter']">Healthcare</div>
                  </div>
                  <div data-layer="Heading 4" data-node-id="46-790" className="Heading4 self-stretch flex flex-col justify-start items-start">
                    <div data-layer="Text" data-node-id="46-791" className="Text justify-center text-white text-xl font-bold font-['Manrope']">Dr. Waqas Ahmad / Homoeopathic Centre Medicare</div>
                  </div>
                </div>
              </div>
            </div>
            <div data-layer="Container" data-node-id="46-792" className="Container self-stretch flex flex-col justify-start items-start">
              <div data-layer="Challenge" data-node-id="46-793" className="ChallengeHighCustomerAcquisitionCostCacAndPoorLeadQualityFromPaidChannels self-stretch justify-center text-[#e3e2e2] text-sm font-bold font-['Inter']">Challenge: A consistent way to generate<br/>relevant leads for the business.</div>
            </div>
            <div data-layer="Container" data-node-id="46-794" className="Container self-stretch flex flex-col justify-start items-start">
              <div data-layer="Services" data-node-id="46-795" className="ServicesGoogleAdsPpcConversionRateOptimizationCro self-stretch justify-center text-[#e3e2e2] text-sm font-bold font-['Inter']">Services: Lead Generation</div>
            </div>
            <div data-layer="Container" data-node-id="46-796" className="Container self-stretch flex flex-col justify-start items-start">
              <div data-layer="Strategy" data-node-id="46-797" className="StrategyHighIntentKeywordRestructuringLandingPagePerformanceAudit self-stretch justify-center text-[#e3e2e2] text-sm font-bold font-['Inter']">What we did: Targeted lead-generation campaigns<br/>tailored to the target audience.</div>
            </div>
            <div data-layer="Margin" data-node-id="46-798" className="Margin self-stretch py-2 flex flex-col justify-start items-start">
              <div data-layer="Border" data-node-id="46-799" className="Border self-stretch pt-4 pb-[17.50px] border-t border-b border-[#292a2a] flex flex-col justify-start items-start gap-1">
                <div data-layer="Container" data-node-id="46-800" className="Container self-stretch inline-flex justify-start items-center gap-2">
                  <div data-layer="Container" data-node-id="46-801" className="Container inline-flex flex-col justify-start items-start">
                    <img data-layer="Icon" data-node-id="46-802" className="Icon w-[22px] h-[21px]" src="/46-802.svg" />
                  </div>
                  <div data-layer="Container" data-node-id="46-803" className="Container inline-flex flex-col justify-start items-start">
                    <div data-layer="Text" data-node-id="46-804" className="Text justify-center text-[#c3f400] text-xs font-bold font-['Inter'] uppercase">KNOWN OUTCOME</div>
                  </div>
                </div>
                <div data-layer="Container" data-node-id="46-805" className="Container self-stretch pb-[2.50px] flex flex-col justify-start items-start">
                  <div data-layer="Relevant leads" data-node-id="46-806" className="42 self-stretch justify-center text-[#c3f400] text-[40px] font-bold font-['Manrope']">RELEVANT</div>
                </div>
                <div data-layer="Text" data-node-id="46-807" className="Text justify-center text-white text-sm font-bold font-['Inter']">Patient Leads</div>
              </div>
            </div>
            <div data-layer="Margin" data-node-id="46-808" className="Margin self-stretch pb-4 flex flex-col justify-start items-start">
              <div data-layer="Container" data-node-id="46-809" className="Container self-stretch flex flex-col justify-start items-start">
                <div data-layer="Approved case study summary" data-node-id="46-810" className="TheirPrecisionTargetingDeliveredBetterLeadsAtNearlyHalfTheCostOfOurPreviousAgency self-stretch justify-center text-[#c4c9ac] text-sm font-normal font-['Inter']">Boost Vertex generated relevant leads<br/>for the client’s business.</div>
              </div>
            </div>
            <div role="link" tabIndex={0} onClick={() => goTo("/case-studies/dr-waqas-ahmad")} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") goTo("/case-studies/dr-waqas-ahmad"); }} data-layer="Button" data-node-id="46-811" className="Button self-stretch px-8 py-4 rounded-lg outline outline-1 outline-offset-[-1px] outline-[#292a2a] flex flex-col justify-center items-center">
              <div data-layer="Text" data-node-id="46-812" className="Text text-center justify-center text-white text-sm font-semibold font-['Inter']">View Case Study →</div>
            </div>
          </div>
          <div data-layer="Case Study 3" data-node-id="46-813" className="CaseStudy3 flex-1 p-6 bg-[#1a1c1c] rounded-xl outline outline-1 outline-offset-[-1px] outline-[#292a2a] inline-flex flex-col justify-start items-start gap-4">
            <div data-layer="Margin" data-node-id="46-814" className="Margin self-stretch pb-2 flex flex-col justify-start items-start">
              <div data-layer="Container" data-node-id="46-815" className="Container self-stretch inline-flex justify-start items-start">
                <div data-layer="Container" data-node-id="46-816" className="Container inline-flex flex-col justify-start items-start gap-1">
                  <div data-layer="Container" data-node-id="46-817" className="Container self-stretch flex flex-col justify-start items-start">
                    <div data-layer="Text" data-node-id="46-818" className="Text justify-center text-[#c3f400] text-base font-normal font-['Inter']">Technology / Software</div>
                  </div>
                  <div data-layer="Heading 4" data-node-id="46-819" className="Heading4 self-stretch flex flex-col justify-start items-start">
                    <div data-layer="Text" data-node-id="46-820" className="Text justify-center text-white text-xl font-bold font-['Chivo']">Whizpool</div>
                  </div>
                </div>
              </div>
            </div>
            <div data-layer="Container" data-node-id="46-821" className="Container self-stretch flex flex-col justify-start items-start">
              <div data-layer="Challenge" data-node-id="46-822" className="ChallengeScalingPaidSocialSpendWithoutSacrificingRoas self-stretch justify-center text-[#e3e2e2] text-sm font-bold font-['Inter']">Challenge: Strengthen online presence and<br/>create better digital opportunities.</div>
            </div>
            <div data-layer="Container" data-node-id="46-823" className="Container self-stretch flex flex-col justify-start items-start">
              <div data-layer="Services" data-node-id="46-824" className="ServicesMetaAdsPaidSocialLeadGeneration self-stretch justify-center text-[#e3e2e2] text-sm font-bold font-['Inter']">Services: Social Media, LinkedIn Content, Meta Ads</div>
            </div>
            <div data-layer="Container" data-node-id="46-825" className="Container self-stretch flex flex-col justify-start items-start">
              <div data-layer="Strategy" data-node-id="46-826" className="StrategyMultiVariateCreativeTestingFullFunnelLeadNurturingAutomation self-stretch justify-center text-[#e3e2e2] text-sm font-bold font-['Inter']">What we did: Social media management,<br/>LinkedIn content, and Meta Ads support.</div>
            </div>
            <div data-layer="Margin" data-node-id="46-827" className="Margin self-stretch py-2 flex flex-col justify-start items-start">
              <div data-layer="Border" data-node-id="46-828" className="Border self-stretch pt-4 pb-[17.50px] border-t border-b border-[#292a2a] flex flex-col justify-start items-start gap-1">
                <div data-layer="Container" data-node-id="46-829" className="Container self-stretch inline-flex justify-start items-center gap-2">
                  <div data-layer="Container" data-node-id="46-830" className="Container inline-flex flex-col justify-start items-start">
                    <img data-layer="Icon" data-node-id="46-831" className="Icon w-[22px] h-[21px]" src="/46-831.svg" />
                  </div>
                  <div data-layer="Container" data-node-id="46-832" className="Container inline-flex flex-col justify-start items-start">
                    <div data-layer="Text" data-node-id="46-833" className="Text justify-center text-[#c3f400] text-xs font-bold font-['Inter'] uppercase">KNOWN OUTCOME</div>
                  </div>
                </div>
                <div data-layer="Container" data-node-id="46-834" className="Container self-stretch pb-[2.50px] flex flex-col justify-start items-start">
                  <div data-layer="Organic leads" data-node-id="46-835" className="2x self-stretch justify-center text-[#c3f400] text-[40px] font-bold font-['Manrope']">ORGANIC</div>
                </div>
                <div data-layer="Text" data-node-id="46-836" className="Text justify-center text-white text-sm font-bold font-['Inter']">LinkedIn Leads</div>
              </div>
            </div>
            <div data-layer="Margin" data-node-id="46-837" className="Margin self-stretch pb-4 flex flex-col justify-start items-start">
              <div data-layer="Container" data-node-id="46-838" className="Container self-stretch flex flex-col justify-start items-start">
                <div data-layer="Approved case study summary" data-node-id="46-839" className="ScalingWasAMajorRiskForUsButBoostVertexMadeItPredictableAndProfitable self-stretch justify-center text-[#c4c9ac] text-sm font-normal font-['Inter']">Whizpool started receiving organic leads<br/>through LinkedIn.</div>
              </div>
            </div>
            <div role="link" tabIndex={0} onClick={() => goTo("/case-studies/whizpool")} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") goTo("/case-studies/whizpool"); }} data-layer="Button" data-node-id="46-840" className="Button self-stretch px-8 py-4 rounded-lg outline outline-1 outline-offset-[-1px] outline-[#292a2a] flex flex-col justify-center items-center">
              <div data-layer="Text" data-node-id="46-841" className="Text text-center justify-center text-white text-sm font-semibold font-['Inter']">View Case Study →</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div data-layer="Section - Process" data-node-id="46-864" className="SectionProcess w-[1280px] max-w-[1280px] px-10 py-12 left-0 top-[3838.50px] absolute inline-flex flex-col justify-start items-start gap-16">
      <div data-layer="Heading 2" data-node-id="46-865" className="Heading2 self-stretch flex flex-col justify-start items-start">
        <div data-layer="How we engineer growth." data-node-id="46-866" className="HowWeEngineerGrowth self-stretch justify-center text-white text-5xl font-bold font-['Chivo']">How we engineer growth.</div>
      </div>
      <div data-layer="Container" data-node-id="46-867" className="Container self-stretch relative flex flex-col justify-start items-start">
        <div data-layer="Horizontal Divider" data-node-id="46-868" className="HorizontalDivider w-[1200px] h-0.5 left-0 top-[48px] absolute bg-[#292a2a]" />
        <div data-layer="Container" data-node-id="46-869" className="Container self-stretch inline-flex justify-center items-start gap-8">
          <div data-layer="Container" data-node-id="46-870" className="Container flex-1 inline-flex flex-col justify-start items-start gap-4">
            <div data-layer="Margin" data-node-id="46-871" className="Margin w-12 h-16 pb-4 flex flex-col justify-start items-start">
              <div data-layer="Background+Border" data-node-id="46-872" className="BackgroundBorder w-12 h-12 bg-[#1e2020] rounded-full outline outline-2 outline-offset-[-2px] outline-[#c3f400] inline-flex justify-center items-center">
                <div data-layer="Text" data-node-id="46-873" className="Text text-center justify-center text-[#c3f400] text-base font-bold font-mono">01</div>
              </div>
            </div>
            <div data-layer="Heading 3" data-node-id="46-874" className="Heading3 self-stretch flex flex-col justify-start items-start">
              <div data-layer="Discover" data-node-id="46-875" className="Discover self-stretch justify-center text-white text-base font-bold font-['Chivo']">Discover</div>
            </div>
            <div data-layer="Container" data-node-id="46-876" className="Container self-stretch flex flex-col justify-start items-start">
              <div data-layer="Deep dive into your business model, market position, and growth bottlenecks to identify high-impact opportunities." data-node-id="46-877" className="DeepDiveIntoYourBusinessModelMarketPositionAndGrowthBottlenecksToIdentifyHighImpactOpportunities self-stretch justify-center text-[#c4c9ac] text-base font-normal font-['Inter']">Deep dive into your business model,<br/>market position, and growth<br/>bottlenecks to identify high-impact<br/>opportunities.</div>
            </div>
          </div>
          <div data-layer="Container" data-node-id="46-878" className="Container flex-1 inline-flex flex-col justify-start items-start gap-4">
            <div data-layer="Margin" data-node-id="46-879" className="Margin w-12 h-16 pb-4 flex flex-col justify-start items-start">
              <div data-layer="Background+Border" data-node-id="46-880" className="BackgroundBorder w-12 h-12 bg-[#1e2020] rounded-full outline outline-2 outline-offset-[-2px] outline-[#c3f400] inline-flex justify-center items-center">
                <div data-layer="Text" data-node-id="46-881" className="Text text-center justify-center text-[#c3f400] text-base font-bold font-mono">02</div>
              </div>
            </div>
            <div data-layer="Heading 3" data-node-id="46-882" className="Heading3 self-stretch flex flex-col justify-start items-start">
              <div data-layer="Strategize" data-node-id="46-883" className="Strategize self-stretch justify-center text-white text-base font-bold font-['Chivo']">Strategize</div>
            </div>
            <div data-layer="Container" data-node-id="46-884" className="Container self-stretch flex flex-col justify-start items-start">
              <div data-layer="Developing a data-backed roadmap across paid, organic, and conversion channels tailored to your specific KPIs." data-node-id="46-885" className="DevelopingADataBackedRoadmapAcrossPaidOrganicAndConversionChannelsTailoredToYourSpecificKpis self-stretch justify-center text-[#c4c9ac] text-base font-normal font-['Inter']">Developing a data-backed roadmap<br/>across paid, organic, and<br/>conversion channels tailored to your<br/>specific KPIs.</div>
            </div>
          </div>
          <div data-layer="Container" data-node-id="46-886" className="Container flex-1 pb-6 inline-flex flex-col justify-start items-start gap-4">
            <div data-layer="Margin" data-node-id="46-887" className="Margin w-12 h-16 pb-4 flex flex-col justify-start items-start">
              <div data-layer="Background+Border" data-node-id="46-888" className="BackgroundBorder w-12 h-12 bg-[#1e2020] rounded-full outline outline-2 outline-offset-[-2px] outline-[#c3f400] inline-flex justify-center items-center">
                <div data-layer="Text" data-node-id="46-889" className="Text text-center justify-center text-[#c3f400] text-base font-bold font-mono">03</div>
              </div>
            </div>
            <div data-layer="Heading 3" data-node-id="46-890" className="Heading3 self-stretch flex flex-col justify-start items-start">
              <div data-layer="Execute" data-node-id="46-891" className="Execute self-stretch justify-center text-white text-base font-bold font-['Chivo']">Execute</div>
            </div>
            <div data-layer="Container" data-node-id="46-892" className="Container self-stretch flex flex-col justify-start items-start">
              <div data-layer="Rapid deployment of campaigns and creative assets with precision tracking and technical excellence." data-node-id="46-893" className="RapidDeploymentOfCampaignsAndCreativeAssetsWithPrecisionTrackingAndTechnicalExcellence self-stretch justify-center text-[#c4c9ac] text-base font-normal font-['Inter']">Rapid deployment of campaigns<br/>and creative assets with precision<br/>tracking and technical excellence.</div>
            </div>
          </div>
          <div data-layer="Container" data-node-id="46-894" className="Container flex-1 inline-flex flex-col justify-start items-start gap-4">
            <div data-layer="Margin" data-node-id="46-895" className="Margin w-12 h-16 pb-4 flex flex-col justify-start items-start">
              <div data-layer="Background+Border" data-node-id="46-896" className="BackgroundBorder w-12 h-12 bg-[#1e2020] rounded-full outline outline-2 outline-offset-[-2px] outline-[#c3f400] inline-flex justify-center items-center">
                <div data-layer="Text" data-node-id="46-897" className="Text text-center justify-center text-[#c3f400] text-base font-bold font-mono">04</div>
              </div>
            </div>
            <div data-layer="Heading 3" data-node-id="46-898" className="Heading3 self-stretch flex flex-col justify-start items-start">
              <div data-layer="Optimize" data-node-id="46-899" className="Optimize self-stretch justify-center text-white text-base font-bold font-['Chivo']">Optimize</div>
            </div>
            <div data-layer="Container" data-node-id="46-900" className="Container self-stretch flex flex-col justify-start items-start">
              <div data-layer="Continuous monitoring, A/B testing, and strategy refinement based on real-time performance data and market shifts." data-node-id="46-901" className="ContinuousMonitoringABTestingAndStrategyRefinementBasedOnRealTimePerformanceDataAndMarketShifts self-stretch justify-center text-[#c4c9ac] text-base font-normal font-['Inter']">Continuous monitoring, A/B testing,<br/>and strategy refinement based on<br/>real-time performance data and<br/>market shifts.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <section id="client-feedback" data-layer="Section - Testimonials" data-node-id="46-902" className="SectionTestimonials w-[1280px] pt-12 pb-[82px] left-0 top-[4272.09px] absolute bg-[#0d0e0f] border-t border-b border-[#292a2a] inline-flex flex-col justify-start items-start">
      <div data-layer="Container" data-node-id="46-903" className="Container w-full max-w-[1280px] px-10 flex flex-col justify-start items-start gap-12">
        <div data-layer="Heading 2" data-node-id="46-904" className="Heading2 self-stretch flex flex-col justify-start items-center">
          <div data-layer="Text" data-node-id="46-905" className="Text text-center justify-center text-white text-5xl font-bold font-['Chivo']">Client feedback.</div>
        </div>
        <div data-layer="Container" data-node-id="46-906" className="Container self-stretch flex justify-start items-stretch gap-8 overflow-x-auto pb-2" aria-label="Client testimonial drafts">
          {testimonials.map((testimonial) => (
            <article key={testimonial.name} className="BackgroundBorder w-[378.66px] min-w-[378.66px] p-8 bg-[#1a1c1c] rounded-xl outline outline-1 outline-offset-[-1px] outline-[#292a2a] inline-flex flex-col justify-between items-start gap-6">
              <img data-layer="Quote Icon" className="Icon w-[22px] h-[21px]" src="/46-1713.svg" alt="" aria-hidden="true" />
              <p className="self-stretch justify-center text-white text-base font-normal font-['Inter']">“{testimonial.quote}”</p>
              <div className="self-stretch pt-4 border-t border-[#292a2a] inline-flex justify-start items-center gap-4">
                {testimonial.image ? <img className="w-12 h-12 rounded-full object-cover" src={testimonial.image} alt="" /> : <span className="w-12 h-12 rounded-full bg-[#292a2a]" aria-hidden="true" />}
                <div className="inline-flex flex-col justify-start items-start gap-[2.50px]"><strong className="text-white text-base font-bold font-['Inter']">{testimonial.name}</strong><small className="text-[#c4c9ac] text-sm font-normal font-['Inter']">{testimonial.role}</small></div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
    <div data-layer="Container" data-node-id="46-1671" className="Container w-[1280px] left-0 top-[3652px] absolute inline-flex justify-center items-start gap-2">
      <div data-layer="Background" data-node-id="46-1687" className="Background w-2 h-2 bg-[#292a2a] rounded-full" />
      <div data-layer="Background" data-node-id="46-1672" className="Background w-2 h-2 bg-[#c3f400] rounded-full" />
      <div data-layer="Background" data-node-id="46-1673" className="Background w-2 h-2 bg-[#292a2a] rounded-full" />
      <div data-layer="Background" data-node-id="46-1675" className="Background w-2 h-2 bg-[#292a2a] rounded-full" />
      <div data-layer="Background" data-node-id="46-1676" className="Background w-2 h-2 bg-[#292a2a] rounded-full" />
      <div data-layer="Background" data-node-id="46-1677" className="Background w-2 h-2 bg-[#292a2a] rounded-full" />
    </div>
    <div id="blog" data-layer="Section - Blog / Resources Preview" data-node-id="46-972" className="SectionBlogResourcesPreview w-[1280px] max-w-[1280px] px-10 py-12 left-0 top-[4822.69px] absolute inline-flex flex-col justify-start items-start gap-12">
      <div data-layer="Container" data-node-id="46-973" className="Container self-stretch inline-flex justify-between items-end">
        <div data-layer="Heading 2" data-node-id="46-974" className="Heading2 w-[576px] h-[115.19px] max-w-[576px] relative">
          <div data-layer="Text" data-node-id="46-975" className="Text left-0 top-[-0.71px] absolute justify-center text-white text-5xl font-bold font-['Chivo']">Useful thinking for your<br/>next move.</div>
        </div>
        <div role="link" tabIndex={0} onClick={() => goTo("/blog")} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") goTo("/blog"); }} data-layer="Link" data-node-id="46-976" className="Link flex justify-start items-center gap-2">
          <div data-layer="Text" data-node-id="46-977" className="Text justify-center text-[#c3f400] text-base font-bold font-['Inter']">View all insights</div>
          <div data-layer="Container" data-node-id="46-978" className="Container inline-flex flex-col justify-start items-start">
            <img data-layer="Icon" data-node-id="46-979" className="Icon w-4 h-4" src="/46-979.svg" />
          </div>
        </div>
      </div>
      <div data-layer="Container" data-node-id="46-980" className="Container self-stretch inline-flex justify-center items-start gap-6">
        <div role="link" tabIndex={0} onClick={() => goTo("/blog/how-to-generate-qualified-leads-with-meta-ads")} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") goTo("/blog/how-to-generate-qualified-leads-with-meta-ads"); }} data-layer="Container" data-node-id="46-981" className="Container flex-1 inline-flex flex-col justify-start items-start gap-2">
          <div data-layer="Background" data-node-id="46-982" className="Background self-stretch h-48 relative bg-[#1e2020] rounded-tl-xl rounded-tr-xl flex flex-col justify-center items-start overflow-hidden">
            <img data-layer="Multi-touch marketing attribution visualization" data-node-id="46-983" className="MultiTouchMarketingAttributionVisualization self-stretch flex-1 rounded-tl-xl rounded-tr-xl" src="/46-983.webp" />
            <div data-layer="Gradient" data-node-id="46-984" className="Gradient w-96 h-48 left-0 top-0 absolute opacity-0 bg-gradient-to-l from-[#c3f400]/20 to-[#c3f400]/0" />
          </div>
          <div data-layer="Container" data-node-id="46-985" className="Container self-stretch pt-2 flex flex-col justify-start items-start">
            <div data-layer="Meta Ads" data-node-id="46-986" className="self-stretch justify-center text-[#c3f400] text-base font-normal font-['Inter']">Meta Ads</div>
          </div>
          <div data-layer="Heading 3" data-node-id="46-987" className="Heading3 self-stretch flex flex-col justify-start items-start">
            <div data-node-id="46-988" className="self-stretch justify-center text-white text-base font-bold font-['Chivo']">How to Generate Qualified Leads with Meta Ads</div>
          </div>
          <div data-layer="Container" data-node-id="46-989" className="Container self-stretch flex flex-col justify-start items-start">
            <div data-node-id="46-990" className="self-stretch justify-center text-[#c4c9ac] text-base font-normal font-['Inter']">A practical guide to building Meta Ads campaigns around qualification and relevance.</div>
          </div>
        </div>
        <div role="link" tabIndex={0} onClick={() => goTo("/blog/why-lead-quality-matters-more-than-lead-volume")} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") goTo("/blog/why-lead-quality-matters-more-than-lead-volume"); }} data-layer="Container" data-node-id="46-991" className="Container flex-1 inline-flex flex-col justify-start items-start gap-2">
          <div data-layer="Background" data-node-id="46-992" className="Background self-stretch h-48 relative bg-[#1e2020] rounded-tl-xl rounded-tr-xl flex flex-col justify-center items-start overflow-hidden">
            <img data-layer="Technical SEO architecture visualization" data-node-id="46-993" className="TechnicalSeoArchitectureVisualization self-stretch flex-1 rounded-tl-xl rounded-tr-xl" src="/46-993.webp" />
            <div data-layer="Gradient" data-node-id="46-994" className="Gradient w-96 h-48 left-0 top-0 absolute opacity-0 bg-gradient-to-l from-[#c3f400]/20 to-[#c3f400]/0" />
          </div>
          <div data-layer="Container" data-node-id="46-995" className="Container self-stretch pt-2 flex flex-col justify-start items-start">
            <div data-layer="SEO" data-node-id="46-996" className="Seo self-stretch justify-center text-[#c3f400] text-base font-normal font-['Inter']">SEO</div>
          </div>
          <div data-layer="Heading 3" data-node-id="46-997" className="Heading3 self-stretch flex flex-col justify-start items-start">
            <div data-node-id="46-998" className="self-stretch justify-center text-white text-base font-bold font-['Chivo']">Why Lead Quality Matters More Than Lead Volume</div>
          </div>
          <div data-layer="Container" data-node-id="46-999" className="Container self-stretch flex flex-col justify-start items-start">
            <div data-node-id="46-1000" className="self-stretch justify-center text-[#c4c9ac] text-base font-normal font-['Inter']">Why relevance, intent, and commercial fit should guide lead-generation decisions.</div>
          </div>
        </div>
        <div role="link" tabIndex={0} onClick={() => goTo("/blog/google-ads-vs-meta-ads-choosing-the-right-channel")} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") goTo("/blog/google-ads-vs-meta-ads-choosing-the-right-channel"); }} data-layer="Container" data-node-id="46-1001" className="Container flex-1 inline-flex flex-col justify-start items-start gap-2">
          <div data-layer="Background" data-node-id="46-1002" className="Background self-stretch h-48 relative bg-[#1e2020] rounded-tl-xl rounded-tr-xl flex flex-col justify-center items-start overflow-hidden">
            <img data-layer="Paid media performance visualization" data-node-id="46-1003" className="PaidMediaPerformanceVisualization self-stretch flex-1 rounded-tl-xl rounded-tr-xl" src="/46-1003.webp" />
            <div data-layer="Gradient" data-node-id="46-1004" className="Gradient w-96 h-48 left-0 top-0 absolute opacity-0 bg-gradient-to-l from-[#c3f400]/20 to-[#c3f400]/0" />
          </div>
          <div data-layer="Container" data-node-id="46-1005" className="Container self-stretch pt-2 flex flex-col justify-start items-start">
            <div data-layer="Google Ads" data-node-id="46-1006" className="self-stretch justify-center text-[#c3f400] text-base font-normal font-['Inter']">Google Ads</div>
          </div>
          <div data-layer="Heading 3" data-node-id="46-1007" className="Heading3 self-stretch flex flex-col justify-start items-start">
            <div data-node-id="46-1008" className="self-stretch justify-center text-white text-base font-bold font-['Chivo']">Google Ads vs Meta Ads: Choosing the Right Channel</div>
          </div>
          <div data-layer="Container" data-node-id="46-1009" className="Container self-stretch flex flex-col justify-start items-start">
            <div data-node-id="46-1010" className="self-stretch justify-center text-[#c4c9ac] text-base font-normal font-['Inter']">A business-focused comparison of high-intent search demand and paid social acquisition.</div>
          </div>
        </div>
      </div>
    </div>
    <div data-layer="Section - FAQ" data-node-id="46-1011" className="SectionFaq w-[800px] max-w-[800px] px-10 py-12 left-[240px] top-[5401.88px] absolute inline-flex flex-col justify-start items-start gap-12">
      <div data-layer="Heading 2" data-node-id="46-1012" className="Heading2 self-stretch flex flex-col justify-start items-center">
        <div data-layer="Text" data-node-id="46-1013" className="Text text-center justify-center text-white text-5xl font-bold font-['Chivo']">Frequently asked questions.</div>
      </div>
      <div data-layer="Container" data-node-id="46-1014" className="Container self-stretch flex flex-col justify-start items-start gap-4">
        <div data-layer="Background+Border" data-node-id="46-1015" className="BackgroundBorder self-stretch bg-[#1a1c1c] rounded-xl outline outline-1 outline-offset-[-1px] outline-[#292a2a] flex flex-col justify-start items-start overflow-hidden">
          <button type="button" aria-expanded={openFaq === 0} data-faq="0" onClick={() => setOpenFaq(openFaq === 0 ? null : 0)} data-layer="Button" data-node-id="46-1016" className="Button self-stretch p-6 inline-flex justify-between items-center">
            <div data-layer="Text" data-node-id="46-1017" className="Text justify-center text-white text-lg font-bold font-['Inter']">What industries do you specialize in?</div>
            <div data-layer="Container" data-node-id="46-1018" className="Container inline-flex flex-col justify-start items-start">
              <img data-layer="Icon" data-node-id="46-1019" className="Icon w-3 h-[7.40px]" src="/46-1019.svg" />
            </div>
          </button>
          {openFaq === 0 && <div className="faq-answer">We specialize in high-growth enterprises, B2B services, SaaS, and ambitious teams with measurable acquisition goals.</div>}
        </div>
        <div data-layer="Background+Border" data-node-id="46-1020" className="BackgroundBorder self-stretch bg-[#1a1c1c] rounded-xl outline outline-1 outline-offset-[-1px] outline-[#292a2a] flex flex-col justify-start items-start overflow-hidden">
          <button type="button" aria-expanded={openFaq === 1} data-faq="1" onClick={() => setOpenFaq(openFaq === 1 ? null : 1)} data-layer="Button" data-node-id="46-1021" className="Button self-stretch p-6 inline-flex justify-between items-center">
            <div data-layer="Text" data-node-id="46-1022" className="Text justify-center text-white text-lg font-bold font-['Inter']">How long does it take to see results?</div>
            <div data-layer="Container" data-node-id="46-1023" className="Container inline-flex flex-col justify-start items-start">
              <img data-layer="Icon" data-node-id="46-1024" className="Icon w-3 h-[7.40px]" src="/46-1024.svg" />
            </div>
          </button>
          {openFaq === 1 && <div className="faq-answer">Early signals can appear within the first few weeks, while durable growth compounds through a consistent testing and optimization cycle.</div>}
        </div>
        <div data-layer="Background+Border" data-node-id="46-1025" className="BackgroundBorder self-stretch bg-[#1a1c1c] rounded-xl outline outline-1 outline-offset-[-1px] outline-[#292a2a] flex flex-col justify-start items-start overflow-hidden">
          <button type="button" aria-expanded={openFaq === 2} data-faq="2" onClick={() => setOpenFaq(openFaq === 2 ? null : 2)} data-layer="Button" data-node-id="46-1026" className="Button self-stretch p-6 inline-flex justify-between items-center">
            <div data-layer="Text" data-node-id="46-1027" className="Text justify-center text-white text-lg font-bold font-['Inter']">Do you require long-term contracts?</div>
            <div data-layer="Container" data-node-id="46-1028" className="Container inline-flex flex-col justify-start items-start">
              <img data-layer="Icon" data-node-id="46-1029" className="Icon w-3 h-[7.40px]" src="/46-1029.svg" />
            </div>
          </button>
          {openFaq === 2 && <div className="faq-answer">We build engagements around the business outcome and stage. Terms are scoped clearly, with flexibility where the work calls for it.</div>}
        </div>
        <div data-layer="Background+Border" data-node-id="46-1030" className="BackgroundBorder self-stretch bg-[#1a1c1c] rounded-xl outline outline-1 outline-offset-[-1px] outline-[#292a2a] flex flex-col justify-start items-start overflow-hidden">
          <button type="button" aria-expanded={openFaq === 3} data-faq="3" onClick={() => setOpenFaq(openFaq === 3 ? null : 3)} data-layer="Button" data-node-id="46-1031" className="Button self-stretch p-6 inline-flex justify-between items-center">
            <div data-layer="Text" data-node-id="46-1032" className="Text justify-center text-white text-lg font-bold font-['Inter']">How do you measure and report success?</div>
            <div data-layer="Container" data-node-id="46-1033" className="Container inline-flex flex-col justify-start items-start">
              <img data-layer="Icon" data-node-id="46-1034" className="Icon w-3 h-[7.40px]" src="/46-1034.svg" />
            </div>
          </button>
          {openFaq === 3 && <div className="faq-answer">We report against agreed KPIs, tying channel activity to qualified leads, revenue signals, conversion efficiency, and the decisions that move them.</div>}
        </div>
        <div data-layer="Background+Border" data-node-id="46-1035" className="BackgroundBorder self-stretch bg-[#1a1c1c] rounded-xl outline outline-1 outline-offset-[-1px] outline-[#292a2a] flex flex-col justify-start items-start overflow-hidden">
          <button type="button" aria-expanded={openFaq === 4} data-faq="4" onClick={() => setOpenFaq(openFaq === 4 ? null : 4)} data-layer="Button" data-node-id="46-1036" className="Button self-stretch p-6 inline-flex justify-between items-center">
            <div data-layer="Text" data-node-id="46-1037" className="Text justify-center text-white text-lg font-bold font-['Inter']">Who will be managing my account?</div>
            <div data-layer="Container" data-node-id="46-1038" className="Container inline-flex flex-col justify-start items-start">
              <img data-layer="Icon" data-node-id="46-1039" className="Icon w-3 h-[7.40px]" src="/46-1039.svg" />
            </div>
          </button>
          {openFaq === 4 && <div className="faq-answer">You will work with a focused growth team led by a senior strategist, supported by channel specialists and a clear reporting cadence.</div>}
        </div>
      </div>
    </div>
    <div id="contact" data-layer="Section - Secondary CTA Band" data-node-id="46-1040" className="SectionSecondaryCtaBand w-[1280px] px-60 py-20 left-0 top-[6057.47px] absolute bg-[#c3f400] inline-flex flex-col justify-start items-start">
      <div data-layer="Container" data-node-id="46-1041" className="Container w-full max-w-[800px] px-4 flex flex-col justify-start items-start gap-6">
        <div data-layer="Heading 2" data-node-id="46-1042" className="Heading2 self-stretch flex flex-col justify-start items-center">
          <div data-layer="Text" data-node-id="46-1043" className="Text text-center justify-center text-[#161e00] text-5xl font-bold font-['Chivo']">Ready to grow? Let's talk.</div>
        </div>
        <div data-layer="Container" data-node-id="46-1044" className="Container self-stretch opacity-90 flex flex-col justify-start items-center">
          <div data-layer="Text" data-node-id="46-1045" className="Text text-center justify-center text-[#161e00] text-base font-normal font-['Inter']">Schedule a strategic session with our growth experts to discuss your specific challenges and<br/>opportunities.</div>
        </div>
        <div data-layer="Container" data-node-id="46-1689" className="Container w-[768px] h-[68px] pt-2 inline-flex justify-center items-start gap-4">
          <div role="button" tabIndex={0} onClick={openConsultation} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") openConsultation(); }} data-layer="Button" data-node-id="46-1690" className="Button px-8 py-4 rounded-xl outline outline-2 outline-offset-[-2px] outline-[#121414] inline-flex flex-col justify-center items-center">
            <div data-layer="Get a Free Consultation" data-node-id="46-1691" className="GetMyFreeGrowthPlan text-center justify-center text-[#121414] text-base font-bold font-['Inter']">Get a Free Consultation</div>
          </div>
          <div role="button" tabIndex={0} onClick={goToContact} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") goToContact(); }} data-layer="Button" data-node-id="46-1692" className="Button px-8 py-[18px] bg-[#121414] rounded-xl inline-flex flex-col justify-center items-center">
            <div data-layer="Discuss Your Project" data-node-id="46-1693" className="BookAFreeStrategyCall text-center justify-center text-[#c3f400] text-base font-bold font-['Inter']">Discuss Your Project</div>
          </div>
        </div>
      </div>
    </div>
    <div data-layer="Footer" data-node-id="46-1051" className="Footer w-[1280px] left-0 top-[6519.06px] absolute bg-[#0d0e0f] border-t border-[#292a2a] inline-flex flex-col justify-start items-start">
      <div data-layer="Container" data-node-id="46-1052" className="Container w-full max-w-[1280px] px-10 py-12 inline-flex flex-col justify-start items-start">
        <div data-layer="Container" data-node-id="46-1053" className="Container self-stretch h-[207.58px] relative">
          <div data-layer="Container" data-node-id="46-1054" className="Container w-[465.59px] left-0 top-0 absolute inline-flex flex-col justify-start items-start">
            <div data-layer="Text" data-node-id="46-1055" className="Text justify-center text-[#c3f400] text-[32px] font-bold font-['Chivo']">Boost Vertex</div>
          </div>
          <div data-layer="Container" data-node-id="46-1056" className="Container w-96 max-w-96 left-0 top-[53.19px] absolute inline-flex flex-col justify-start items-start">
            <div data-layer="Text" data-node-id="46-1057" className="Text justify-center text-[#c4c9ac] text-base font-normal font-['Inter']">Performance marketing built around Meta Ads, qualified leads, and measurable business outcomes.</div>
          </div>
          <div data-layer="Margin" data-node-id="46-1058" className="Margin w-[465.59px] pt-4 left-0 top-[121.58px] absolute inline-flex flex-col justify-start items-start">
            <div data-layer="Container" data-node-id="46-1059" className="Container self-stretch flex flex-col justify-start items-start gap-2">
              <div data-layer="Heading 4" data-node-id="46-1060" className="Heading4 self-stretch flex flex-col justify-start items-start">
                <div data-layer="Subscribe to our Insights" data-node-id="46-1061" className="SubscribeToOurInsights self-stretch justify-center text-white text-xs font-semibold font-['Inter']">Subscribe to our Insights</div>
              </div>
              <div data-layer="Container" data-node-id="46-1062" className="Container self-stretch inline-flex justify-start items-start gap-2">
                <input type="email" name="insightsEmail" placeholder="Email address" aria-label="Email address" data-layer="Input" data-node-id="46-1063" className="Input w-[250px] self-stretch max-w-[250px] px-4 py-3.5 rounded-lg outline outline-1 outline-offset-[-1px] outline-[#292a2a] inline-flex flex-col justify-start items-start overflow-hidden" />
                <button type="button" onClick={() => goTo("/blog")} data-layer="Button" data-node-id="46-1066" className="Button px-4 py-[13px] bg-[#c3f400] rounded-xl inline-flex flex-col justify-center items-center">
                  <div data-layer="Text" data-node-id="46-1067" className="Text text-center justify-center text-[#161e00] text-base font-bold font-['Inter']">Join</div>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div data-layer="Container" data-node-id="46-1068" className="Container self-stretch pb-[37.21px] inline-flex flex-col justify-start items-start gap-[11px]">
          <div data-layer="Heading 4:margin" data-node-id="46-1069" className="Heading4Margin self-stretch pb-2 flex flex-col justify-start items-start">
            <div data-layer="Heading 4" data-node-id="46-1070" className="Heading4 self-stretch flex flex-col justify-start items-start">
              <div data-layer="Services" data-node-id="46-1071" className="Services self-stretch justify-center text-white text-xs font-semibold font-['Inter']">Services</div>
            </div>
          </div>
          <div role="link" tabIndex={0} onClick={() => goTo("/services/meta-ads-management")} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") goTo("/services/meta-ads-management"); }} data-layer="Link" data-node-id="46-1072" className="Link self-stretch pb-[0.59px] flex flex-col justify-start items-start">
            <div data-layer="SEO" data-node-id="46-1073" className="self-stretch justify-center text-[#c4c9ac] text-base font-normal font-['Inter']">Meta Ads Management</div>
          </div>
          <div role="link" tabIndex={0} onClick={() => goTo("/services/lead-generation")} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") goTo("/services/lead-generation"); }} data-layer="Link" data-node-id="46-1074" className="Link self-stretch pb-[0.59px] flex flex-col justify-start items-start">
            <div data-node-id="46-1075" className="self-stretch justify-center text-[#c4c9ac] text-base font-normal font-['Inter']">Lead Generation</div>
          </div>
          <div role="link" tabIndex={0} onClick={() => goTo("/services/google-ads")} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") goTo("/services/google-ads"); }} data-layer="Link" data-node-id="46-1076" className="Link self-stretch pb-[0.59px] flex flex-col justify-start items-start">
            <div data-node-id="46-1077" className="self-stretch justify-center text-[#c4c9ac] text-base font-normal font-['Inter']">Google Ads</div>
          </div>
          <div role="link" tabIndex={0} onClick={() => goTo("/services/web-development")} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") goTo("/services/web-development"); }} data-layer="Link" data-node-id="46-1078" className="Link self-stretch pb-[0.59px] flex flex-col justify-start items-start">
            <div data-layer="Web Development" data-node-id="46-1079" className="WebDevelopment self-stretch justify-center text-[#c4c9ac] text-base font-normal font-['Inter']">Web Development</div>
          </div>
        </div>
        <div data-layer="Container" data-node-id="46-1080" className="Container self-stretch pb-[37.21px] inline-flex flex-col justify-start items-start gap-[11px]">
          <div data-layer="Heading 4:margin" data-node-id="46-1081" className="Heading4Margin self-stretch pb-2 flex flex-col justify-start items-start">
            <div data-layer="Heading 4" data-node-id="46-1082" className="Heading4 self-stretch flex flex-col justify-start items-start">
              <div data-layer="Company" data-node-id="46-1083" className="Company self-stretch justify-center text-white text-xs font-semibold font-['Inter']">Company</div>
            </div>
          </div>
          <div role="link" tabIndex={0} onClick={() => goTo("/about")} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") goTo("/about"); }} data-layer="Link" data-node-id="46-1084" className="Link self-stretch pb-[0.59px] flex flex-col justify-start items-start">
            <div data-layer="About Us" data-node-id="46-1085" className="AboutUs self-stretch justify-center text-[#c4c9ac] text-base font-normal font-['Inter']">About Us</div>
          </div>
          <div role="link" tabIndex={0} onClick={() => goTo("/industries/industries")} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") goTo("/industries/industries"); }} data-layer="Link" data-node-id="46-1086" className="Link self-stretch pb-[0.59px] flex flex-col justify-start items-start">
            <div data-layer="Industries" data-node-id="46-1087" className="Careers self-stretch justify-center text-[#c4c9ac] text-base font-normal font-['Inter']">Industries</div>
          </div>
          <div role="link" tabIndex={0} onClick={() => goTo("/case-studies")} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") goTo("/case-studies"); }} data-layer="Link" data-node-id="46-1088" className="Link self-stretch pb-[0.59px] flex flex-col justify-start items-start">
            <div data-layer="Case Studies" data-node-id="46-1089" className="CaseStudies self-stretch justify-center text-[#c4c9ac] text-base font-normal font-['Inter']">Case Studies</div>
          </div>
          <div role="link" tabIndex={0} onClick={() => goTo("/contact")} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") goTo("/contact"); }} data-layer="Link" data-node-id="46-1090" className="Link self-stretch pb-[0.59px] flex flex-col justify-start items-start">
            <div data-layer="Contact" data-node-id="46-1091" className="Contact self-stretch justify-center text-[#c4c9ac] text-base font-normal font-['Inter']">Contact</div>
          </div>
        </div>
        <div data-layer="Container" data-node-id="46-1092" className="Container self-stretch pb-[29.21px] inline-flex flex-col justify-start items-start gap-3">
          <div data-layer="Heading 4:margin" data-node-id="46-1093" className="Heading4Margin self-stretch pb-2 flex flex-col justify-start items-start">
            <div data-layer="Heading 4" data-node-id="46-1094" className="Heading4 self-stretch flex flex-col justify-start items-start">
              <div data-layer="Connect" data-node-id="46-1095" className="Connect self-stretch justify-center text-white text-xs font-semibold font-['Inter']">Connect</div>
            </div>
          </div>
          <a href={`mailto:${approvedContact.email}`} data-layer="Link" data-node-id="46-1096" className="Link self-stretch h-[25.59px] pb-[0.79px] inline-flex justify-start items-end gap-2">
            <div data-layer="Container" data-node-id="46-1097" className="Container inline-flex flex-col justify-start items-start">
              <img data-layer="Icon" data-node-id="46-1098" className="Icon w-5 h-4" src="/46-1098.svg" />
            </div>
            <div data-layer="Text" data-node-id="46-1099" className="Text justify-center text-[#c4c9ac] text-base font-normal font-['Inter']">{approvedContact.email}</div>
          </a>
          <a href={approvedContact.whatsappUrl} target="_blank" rel="noreferrer" data-layer="Link" data-node-id="46-1100" className="Link self-stretch h-[25.59px] pb-[0.80px] inline-flex justify-start items-end gap-2">
            <div data-layer="Container" data-node-id="46-1101" className="Container inline-flex flex-col justify-start items-start">
              <img data-layer="Icon" data-node-id="46-1102" className="Icon w-[18px] h-[18px]" src="/46-1102.svg" />
            </div>
            <div data-layer="Text" data-node-id="46-1103" className="Text justify-center text-[#c4c9ac] text-base font-normal font-['Inter']">WhatsApp: {approvedContact.phoneDisplay}</div>
          </a>
          <div data-layer="Link:margin" data-node-id="46-1104" className="LinkMargin self-stretch pt-[7px] flex flex-col justify-start items-start">
            <a href={approvedContact.linkedin} target="_blank" rel="noreferrer" data-layer="Link" data-node-id="46-1105" className="Link self-stretch pb-[0.59px] inline-flex justify-start items-center">
              <div data-layer="Text" data-node-id="46-1106" className="Text justify-center text-[#c4c9ac] text-base font-normal font-['Inter']">LinkedIn</div>
            </a>
          </div>
          <a href={approvedContact.instagram} target="_blank" rel="noreferrer" data-layer="Link" data-node-id="46-1107" className="Link self-stretch h-[25.59px] pb-[1.59px] inline-flex justify-start items-center">
              <div data-layer="Text" data-node-id="46-1108" className="Text justify-center text-[#c4c9ac] text-base font-normal font-['Inter']">Instagram</div>
          </a>
        </div>
      </div>
      <div data-layer="HorizontalBorder" data-node-id="46-1109" className="Horizontalborder w-full max-w-[1280px] px-10 py-6 border-t border-[#292a2a] inline-flex justify-between items-center">
        <div data-layer="Container" data-node-id="46-1110" className="Container inline-flex flex-col justify-start items-start">
          <div data-layer="Text" data-node-id="46-1111" className="Text justify-center text-[#c4c9ac] text-sm font-normal font-['Inter']">© 2024 Boost Vertex Digital. All rights reserved.</div>
        </div>
        <div data-layer="Container" data-node-id="46-1112" className="Container flex justify-start items-start gap-4">
          <a href="/privacy-policy" data-action="home-footer-privacy-policy" data-layer="Link" data-node-id="46-1113" className="Link self-stretch inline-flex flex-col justify-start items-start">
            <div data-layer="Text" data-node-id="46-1114" className="Text justify-center text-[#c4c9ac] text-sm font-normal font-['Inter']">Privacy Policy</div>
          </a>
          <div role="link" tabIndex={0} onClick={() => goTo("/privacy-policy")} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") goTo("/privacy-policy"); }} data-layer="Link" data-node-id="46-1115" className="Link self-stretch inline-flex flex-col justify-start items-start">
            <div data-layer="Text" data-node-id="46-1116" className="Text justify-center text-[#c4c9ac] text-sm font-normal font-['Inter']">Terms of Service</div>
          </div>
        </div>
      </div>
    </div>
    <div data-layer="Section - Results Statistics" data-node-id="46-1637" className="SectionResultsStatistics w-[1280px] py-[29px] left-0 top-[3685px] absolute bg-[#c3f400]/10 border-t border-b border-[#c3f400]/20 inline-flex flex-col justify-start items-start">
      <div data-layer="Container" data-node-id="46-1638" className="Container w-full max-w-[1280px] px-10 inline-flex justify-center items-start gap-8">
        <div data-layer="Container" data-node-id="46-1639" className="Container flex-1 inline-flex flex-col justify-start items-center gap-2">
          <div data-layer="Container" data-node-id="46-1640" className="Container self-stretch flex flex-col justify-start items-center">
            <div data-layer="3" data-node-id="46-1641" className="text-center justify-center text-[#c3f400] text-[56px] font-bold font-['Chivo']">3</div>
          </div>
          <div data-layer="Confirmed client engagements" data-node-id="46-1642" className="text-center justify-center text-[#c4c9ac] text-base font-normal font-['Inter']">Confirmed Client Engagements</div>
        </div>
        <div data-layer="Container" data-node-id="46-1643" className="Container flex-1 inline-flex flex-col justify-start items-center gap-2">
          <div data-layer="Container" data-node-id="46-1644" className="Container self-stretch flex flex-col justify-start items-center">
            <div data-layer="3" data-node-id="46-1645" className="text-center justify-center text-[#c3f400] text-[56px] font-bold font-['Chivo']">3</div>
          </div>
          <div data-layer="Core industries" data-node-id="46-1646" className="text-center justify-center text-[#c4c9ac] text-base font-normal font-['Inter']">Core Industries</div>
        </div>
        <div data-layer="Container" data-node-id="46-1647" className="home-operating-markets-stat Container flex-1 inline-flex flex-col justify-start items-center gap-2">
          <div data-layer="Container" data-node-id="46-1648" className="Container self-stretch flex flex-col justify-start items-center">
            <div data-layer="PK · UAE · KSA" data-node-id="46-1649" className="text-center justify-center text-[#c3f400] text-[32px] font-bold font-['Chivo']">PK · UAE · KSA</div>
          </div>
          <div data-layer="Operating markets" data-node-id="46-1650" className="text-center justify-center text-[#c4c9ac] text-base font-normal font-['Inter']">Operating Markets</div>
        </div>
        <div data-layer="Container" data-node-id="46-1651" className="Container flex-1 inline-flex flex-col justify-start items-center gap-2">
          <div data-layer="Container" data-node-id="46-1652" className="Container self-stretch flex flex-col justify-start items-center">
            <div data-layer="6" data-node-id="46-1653" className="text-center justify-center text-[#c3f400] text-[56px] font-bold font-['Chivo']">6</div>
          </div>
          <div data-layer="Services" data-node-id="46-1654" className="text-center justify-center text-[#c4c9ac] text-base font-normal font-['Inter']">Services</div>
        </div>
      </div>
    </div>
  </div>
  <div className="mobile-fast-track" aria-label="Fast Track actions">
    <button type="button" aria-label="Call Boost Vertex" aria-pressed={activeTray === "Call"} onClick={() => openFastTrack("Call")}>
      <img src="/46-537.svg" alt="" />
      <span>CALL</span>
    </button>
    <button type="button" aria-label="Chat with Boost Vertex" aria-pressed={activeTray === "Chat"} onClick={() => openFastTrack("Chat")}>
      <img src="/46-542.svg" alt="" />
      <span>CHAT</span>
    </button>
    <button type="button" aria-label="Book a Boost Vertex strategy call" aria-pressed={activeTray === "Book"} onClick={() => openFastTrack("Book")}>
      <img src="/46-547.svg" alt="" />
      <span>BOOK</span>
    </button>
    <button type="button" aria-label="Send an inquiry to Boost Vertex" aria-pressed={activeTray === "Inquiry"} onClick={() => openFastTrack("Inquiry")}>
      <img src="/46-552.svg" alt="" />
      <span>INQUIRY</span>
    </button>
  </div>
  <div className={`mv-action-feedback ${actionMessage ? "is-visible" : ""}`} role="status" aria-live="polite">{actionMessage}</div>
</div>
  )
}
