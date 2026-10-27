# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: people who own an apartment in São Paulo and are about to renovate it. They have heard the stories of renovations that blew the budget and the deadline, and they are afraid it will happen to them. They are comparing architects, usually on their phone, often after a referral or an Instagram post, and want to know whether this studio will keep their renovation under control.

Secondary audiences, in order: restaurants and small commercial spaces; building managers (síndicos), condominiums and corporate clients (mostly reached through LinkedIn).

## Product Purpose

Estúdio Contorno is an architecture and construction-management studio in São Paulo run by Malu Burato. The website exists to turn a visitor into a WhatsApp conversation with Malu (`https://wa.me/5511981660262`). Success means a prospective client understands, within seconds, that this studio plans everything before the work starts and then manages the execution, and decides to talk to Malu.

## Positioning

Design and execution belong to the same person. The work only starts once every budget has been approved, and the studio follows the construction closely so it is delivered on the predicted deadline and cost. "Quality architecture at the lowest possible cost."

## Operating Context

The process has three phases, each with a fixed color code:

- **Conceitual** (briefing, concept, preliminary design)
- **Executivo** (executive design, technical specification, financial schedule)
- **Gestão** (construction management, purchasing, production)

Clients buy one of three packages: 1 = Conceitual · 2 = Conceitual + Executivo · 3 = all three phases. Contact happens on WhatsApp, by email (malu@estudiocontorno.com.br) and through a short form.

## Capabilities and Constraints

- One page with anchored sections: first screen, the 3 phases, packages, works, Malu, contact. A floating WhatsApp button appears on every page.
- Local SEO for São Paulo: "reforma de apartamento São Paulo", "arquiteta para reforma", "gerenciamento de obra".
- Stack: Astro + Tailwind CSS + GSAP/Lenis, static hosting on GitHub Pages.
- Undecided: Myriad Pro via the Adobe Fonts kit or Heebo as its substitute (Heebo in use for now).

## Brand Commitments

The brand manual (`MANUAL_DE_MARCA_ESTUDIO_CONTORNO.md`, v1.0, October 2026) is binding:

- Palette: Verde Contorno #8FBEAB as the brand ground; Verde Floresta #50625E for details only, never as a background; Floresta profundo #384744 for text; terracottas for the phases, with Terracota destaque #CB603F reserved for one CTA per page; gelo #F8F8F8 as the default ground. Proportion: 50% white/gelo, 30% green, 10% terracotta, 10% Floresta. Blue, yellow, pink and purple are out.
- Type: Montserrat 900, uppercase, short phrases for impact titles; Myriad Pro (or Heebo) for text.
- The symbol is the floor plan of a room: rounded corners, with two offset openings read as a door and a window. Never retype the logotype. White with the #6F9483 outline on the green.
- The grafismo texture: big, behind the content, dense on the right and opening out to the left until it ends. It is never cut by a box.
- Rounded corners everywhere, and a 48 × 4 px terracotta rule under section titles.
- Voice: close, clear and confident, the voice of an architect who is on site. Address the reader as "você", use short sentences and concrete numbers. Sign as "Estúdio Contorno / Malu Burato", never "Arq.". Avoid "metodologia exclusiva" and alarmism.
- Photography: real delivered projects, natural light, straight verticals; Malu on site; before/after shots from the same angle.

## Evidence on Hand

- "+80 obras entregues", own practice since 04/02/2021 (from the manual).
- Real project photos exist but are not available yet. Until they arrive, use clearly marked placeholders. Do not invent project names, neighborhoods, sizes, testimonials or savings figures.
- Official logos, the grafismo and the icons are in the manual's `logos/`, `grafismo/` and `icones/` folders; they have not been uploaded to this repo yet.

## Product Principles

1. Plan before you build: the site itself should feel planned, precise and in control.
2. Show the method, not adjectives: phases, approved budgets and deadlines kept, told with concrete facts.
3. Malu is present: a person on site, not a faceless firm.
4. Every page ends in a conversation with Malu.

## Accessibility & Inclusion

WCAG 2.1 AA. White on Verde Contorno only at 24 px and up; small text on green uses Floresta profundo. Respect `prefers-reduced-motion`. Focus outline: 3 px Terracota destaque.
