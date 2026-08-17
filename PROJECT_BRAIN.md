# PROJECT_BRAIN.md

Version: 2.0
Project: UBC / SANCHI Udaipur Bohra League
Platform: UBC Community + Sports + Business Platform
Current Season: UBL Season 2 · 2026
Status: POST-AUCTION / PLATFORM DEVELOPMENT
Last Major Milestone: UBL Season 2 Auction Completed
Current Phase: UBC 2.0 Product Design & Development

===============================================================================
1. PROJECT VISION
===============================================================================

UBC is no longer just an auction website.

The original application was built around the SANCHI Udaipur Bohra League
auction because the auction was the immediate deadline and primary event.

That phase is now COMPLETE.

The next phase is to evolve UBC into a platform that people have a reason
to open regularly.

UBC should become a digital home for:

• UBL / Sports
• Players
• Teams
• Businesses
• Events
• Community
• Sponsors
• Announcements
• Future notifications
• Future member accounts

The long-term objective is to create a platform that feels like a real
community product rather than a tournament website.

The auction was the beginning.

The platform is the product.

-------------------------------------------------------------------------------

PRIMARY PRODUCT GOAL
-------------------------------------------------------------------------------

Build a premium, community-focused UBC platform that combines:

1. Sports
2. Player identities
3. Tournament information
4. Local businesses
5. Community events
6. Community updates
7. Sponsors
8. Personal accounts
9. Future notifications
10. Future mobile applications

The platform must be useful even when there is no auction or active match.

-------------------------------------------------------------------------------

TARGET USER FEELING
-------------------------------------------------------------------------------

UBC should feel:

• Premium
• Modern
• Community-driven
• Local
• Trustworthy
• Elegant
• Human
• Sport-focused without being sport-only
• Easy to explore
• Professional
• Designed intentionally for every device

The application should feel like a real product.

It should NOT feel like:

✗ A generic SaaS dashboard
✗ A temporary tournament website
✗ A collection of unrelated cards
✗ A gaming dashboard
✗ A template with UBC colors applied
✗ An auction interface after the auction has ended
✗ A desktop website squeezed onto mobile

-------------------------------------------------------------------------------

VISUAL DIRECTION
-------------------------------------------------------------------------------

Existing visual direction remains valuable:

• Linen
• Handmade paper
• Sandstone
• Walnut
• Brass
• Antique gold
• Premium typography
• Elegant textures
• Strong hierarchy
• Controlled motion
• Subtle depth
• Premium card elevation

Avoid:

✗ Neon UI
✗ Excessive gradients
✗ Visual clutter
✗ Generic SaaS appearance
✗ Excessive glassmorphism
✗ Unnecessary animation
✗ Inconsistent spacing
✗ Random component styling

The design should evolve beyond the auction visual language while preserving
the premium UBC identity.

-------------------------------------------------------------------------------

2. CURRENT PROJECT STATE
-------------------------------------------------------------------------------

The auction phase is COMPLETE.

The application successfully supported:

• Live player selection
• Live bidding
• Going Once
• Going Twice
• Sold
• Unsold handling
• Team purse management
• Team synchronization
• Player synchronization
• Live display/broadcast
• Auction admin controls
• Auction data persistence
• Firebase synchronization

The auction data has now been finalized and reconciled.

-------------------------------------------------------------------------------

FINAL AUCTION DATA
-------------------------------------------------------------------------------

Total players:

151

Final player status:

104 SOLD
47 UNSOLD
0 AVAILABLE
0 LIVE

All 8 teams contain:

13 players each

Total squad size:

104 players

Financial reconciliation:

Initial total purse:
₹12.00 Cr

Total spent:
₹10.83 Cr

Remaining purses:
₹1.17 Cr

Final team purses:

LT Lions:
₹24L

Regen Royals:
₹25L

GM Gladiators:
₹1L

Best Eleven:
₹35L

Bandookwala Titans:
₹6L

Global Challengers:
₹0

Babji Blasters:
₹0

BRF Legal Legends:
₹26L

The final player dataset and team dataset passed the audit.

The auction data is considered the official Season 2 auction record.

IMPORTANT:

Do not casually modify the finalized auction data.

Do not use the old auction import/reset mechanisms to recreate auction data.

Do not reset the tournament.

The finalized dataset has been synchronized to Firebase.

-------------------------------------------------------------------------------

SPECIAL DATA CORRECTION
-------------------------------------------------------------------------------

P73 — Hussain Magar Wala

Official sold price:

₹10L

NOT ₹18L.

The incorrect ₹18L value caused an ₹8L reconciliation mismatch and was corrected.

The final audit passed after this correction.

-------------------------------------------------------------------------------

3. ARCHITECTURE PRINCIPLES
-------------------------------------------------------------------------------

DO NOT rebuild the application from scratch.

Existing architecture is valuable.

Continue using:

• React
• TanStack
• Firebase
• Firestore
• Existing auction store
• Existing reusable components
• Existing routing structure
• Existing player/team data architecture

Extend existing systems.

Do not create duplicate systems when an existing system can be extended.

-------------------------------------------------------------------------------

CORE PRINCIPLE
-------------------------------------------------------------------------------

ONE PLATFORM.

ONE DATA LAYER.

MULTIPLE EXPERIENCES.

The same Firebase/backend architecture should eventually power:

• Web
• PWA
• Android
• iOS

Do not create separate databases for different platforms.

-------------------------------------------------------------------------------

4. NEW PRODUCT DIRECTION
-------------------------------------------------------------------------------

The application is transitioning from:

AUCTION PLATFORM

to:

UBC COMMUNITY PLATFORM

The new major product areas are:

1. HOME
2. UBL / SPORTS
3. PLAYERS
4. PLAYER PROFILES
5. TEAMS
6. BUSINESSES
7. EVENTS
8. COMMUNITY
9. SPONSORS
10. ACCOUNTS
11. ADMIN CONTROL CENTER

-------------------------------------------------------------------------------

5. HOMEPAGE — NEW DIRECTION
-------------------------------------------------------------------------------

The existing homepage was heavily designed around the auction.

That is no longer appropriate.

Remove/retire auction-focused homepage presentation such as:

✗ Auction Hero
✗ View Live Auction button
✗ Auction countdown
✗ Auction progress
✗ Recent auction sales
✗ Auction event feed
✗ Auction-specific player presentation
✗ Auction-specific live status

Do NOT delete auction functionality itself.

Auction functionality remains preserved for historical/reference purposes.

-------------------------------------------------------------------------------

NEW HOMEPAGE PURPOSE
-------------------------------------------------------------------------------

The homepage should answer:

"What is happening in UBC right now?"

and:

"Why should I open UBC again tomorrow?"

The homepage should prioritize:

• UBC identity
• Current community activity
• UBL season
• Upcoming matches
• Recent results
• Businesses
• Events
• Community updates
• Sponsors

-------------------------------------------------------------------------------

PROPOSED HOMEPAGE STRUCTURE
-------------------------------------------------------------------------------

1. HERO

Primary UBC identity.

Should communicate:

• UBC
• Community
• Sports
• Businesses
• Events

Potential primary actions:

• Explore UBC
• Explore UBL
• Discover Businesses

The hero should NOT be an auction screen.

-------------------------------------------------------------------------------

2. WHAT'S HAPPENING

Dynamic community activity.

Potential content:

• Match
• Event
• Announcement
• Community update
• Business promotion

-------------------------------------------------------------------------------

3. UBL SEASON SECTION

Show the current state of UBL.

Possible content:

• Season 2
• Next match
• Recent result
• Current standings
• Teams
• Season status

If fixtures do not yet exist, the section should gracefully show an
appropriate empty/upcoming state.

-------------------------------------------------------------------------------

4. BUSINESS DISCOVERY

Introduce local businesses prominently.

Possible content:

• Featured businesses
• Categories
• Promotions
• Offers
• Business discovery

CTA:

Explore Businesses

-------------------------------------------------------------------------------

5. EVENTS

Show upcoming community events.

Possible content:

• Event title
• Date
• Time
• Location
• Event image
• Event details

-------------------------------------------------------------------------------

6. COMMUNITY UPDATES

A dynamic community feed.

Possible content:

• Announcements
• Stories
• Community achievements
• UBL updates
• Photos
• Important notices

-------------------------------------------------------------------------------

7. SPONSORS

Existing sponsor functionality remains.

Sponsors should be presented professionally rather than simply as a collection
of logos.

-------------------------------------------------------------------------------

8. FOOTER

Professional UBC footer.

Should eventually include:

• Navigation
• Social links
• Contact
• Business directory
• UBL
• Sponsors
• Terms
• Privacy
• Account access

-------------------------------------------------------------------------------

6. PLAYER PROFILES
-------------------------------------------------------------------------------

Player profiles are now a CORE UBC feature.

The 104 sold UBL players should eventually have personal UBC player accounts.

A player should have:

• Player identity
• Profile
• Team
• Statistics
• Matches
• Achievements
• Biography
• Personal information
• Player-controlled profile information

-------------------------------------------------------------------------------

PLAYER IDENTITY
-------------------------------------------------------------------------------

Every player has a permanent UBL identity.

Example:

P73

The player number should remain stable even if the player changes their
authentication email.

Authentication identity and player identity must remain separate.

-------------------------------------------------------------------------------

PLAYER ACCOUNT AUTHENTICATION
-------------------------------------------------------------------------------

Potential authentication methods:

1. Google / Gmail login
2. UBC-provided email login
3. Email/password authentication

Google authentication should be considered the easiest onboarding option.

Custom player email addresses may be provided if desired.

Do NOT assume that 104 real Gmail/Google Workspace mailboxes need to be created.

The preferred architecture is:

Firebase Auth UID
        ↓
UBC Account
        ↓
Player Profile
        ↓
UBL Player ID

-------------------------------------------------------------------------------

PLAYER PROFILE DATA OWNERSHIP
-------------------------------------------------------------------------------

Separate OFFICIAL data from PLAYER-CONTROLLED data.

OFFICIAL / ADMIN-CONTROLLED:

• Player number
• Official name
• Team
• Auction price
• Auction status
• Official statistics
• Match statistics
• Awards
• Achievements

PLAYER-CONTROLLED:

• Profile photo
• Bio
• Preferred display name
• Personal introduction
• Batting style
• Bowling style
• Location
• Social links
• Other approved profile fields

Players must NOT be able to edit official statistics or auction information.

-------------------------------------------------------------------------------

PLAYER PROFILE PAGE
-------------------------------------------------------------------------------

Potential structure:

• Profile photo
• Name
• Player number
• Team
• Role
• Key statistics
• About
• Season performance
• Match history
• Achievements
• Social links

The profile should become increasingly dynamic as match data is added.

-------------------------------------------------------------------------------

PLAYER DASHBOARD
-------------------------------------------------------------------------------

Eventually authenticated players should have:

MY UBL

• My Profile
• My Team
• My Statistics
• My Matches
• My Achievements
• My Photos
• Account Settings

Future functionality may include:

• Upcoming match notifications
• Recent match performance
• Team updates
• Season statistics

-------------------------------------------------------------------------------

7. ACCOUNTS AND ROLES
-------------------------------------------------------------------------------

Long-term UBC account structure:

UBC ACCOUNT

├── PLAYER
├── MEMBER
└── ADMIN

PLAYER:

• Personal player profile
• Team
• Statistics
• Matches

MEMBER:

• Community profile
• Events
• Businesses
• Community activity

ADMIN:

• Content management
• Players
• Teams
• Sports
• Businesses
• Events
• Sponsors
• Platform controls

Authentication must be separated from application profile data.

Role-based access must be enforced through secure Firebase authorization.

-------------------------------------------------------------------------------

8. ADMIN PANEL — FUTURE
-------------------------------------------------------------------------------

The existing Admin Auction panel was created specifically for the auction.

The auction controls should NOT be unnecessarily deleted.

Instead:

EVOLVE

Admin Auction

into:

ADMIN CONTROL CENTER

-------------------------------------------------------------------------------

FUTURE ADMIN AREAS
-------------------------------------------------------------------------------

ADMIN

├── Dashboard
├── Content
├── UBL / Sports
├── Players
├── Teams
├── Player Accounts
├── Businesses
├── Events
├── Sponsors
├── Announcements
└── Platform Settings

-------------------------------------------------------------------------------

ADMIN DASHBOARD
-------------------------------------------------------------------------------

Eventually show:

• Platform overview
• UBL status
• Upcoming matches
• Recent activity
• Businesses
• Events
• Player accounts
• Content
• System status

-------------------------------------------------------------------------------

ADMIN CONTENT
-------------------------------------------------------------------------------

Admin should eventually be able to manage:

• Homepage content
• Announcements
• Events
• Community updates
• Featured businesses
• Promotions
• Sponsors
• UBL content

Goal:

Content should eventually be editable without changing source code.

-------------------------------------------------------------------------------

ADMIN SPORTS
-------------------------------------------------------------------------------

Existing auction engine remains preserved.

Future sports controls:

• Fixtures
• Results
• Match status
• Match centre
• Player statistics
• Team statistics
• Points table
• Awards

-------------------------------------------------------------------------------

9. UBL / TOURNAMENT PLATFORM
-------------------------------------------------------------------------------

UBL becomes one major section of UBC rather than the entire identity of UBC.

Core future UBL areas:

• Teams
• Players
• Fixtures
• Results
• Points table
• Match centre
• Statistics
• Awards
• Gallery

-------------------------------------------------------------------------------

TOURNAMENT ROADMAP
-------------------------------------------------------------------------------

TOUR-001 Fixtures
🔴

TOUR-002 Points Table
🔴

TOUR-003 Match Centre
🔴

TOUR-004 Awards
🔴

TOUR-005 Gallery
🔴

TOUR-006 Player Statistics
🔴

TOUR-007 Team Statistics
🔴

TOUR-008 Live Match Updates
🔴

TOUR-009 Season Archive
🔴

-------------------------------------------------------------------------------

10. TEAMS
-------------------------------------------------------------------------------

Existing team architecture remains.

Future team pages should include:

• Team identity
• Logo
• Owners
• Squad
• Players
• Spending
• Season statistics
• Matches
• Results
• Points
• Achievements

Team pages should connect directly to player profiles.

Example:

Team
 ↓
Squad
 ↓
Player
 ↓
Player Profile

-------------------------------------------------------------------------------

11. BUSINESSES
-------------------------------------------------------------------------------

Business discovery is a major UBC platform feature.

Existing business functionality should be expanded.

Businesses should eventually have:

• Business profile
• Name
• Category
• Description
• Photos
• Contact
• Location
• Website
• Social links
• Promotions
• Featured status
• Community relationship

Potential categories:

• Food
• Sports
• Clothing
• Electronics
• Auto
• Services
• Other local categories

-------------------------------------------------------------------------------

BUSINESS DISCOVERY
-------------------------------------------------------------------------------

Users should be able to:

• Browse
• Search
• Filter
• Open profiles
• View promotions
• Contact businesses
• Discover featured businesses

Future possibility:

Business owners may receive their own accounts/dashboard.

-------------------------------------------------------------------------------

12. EVENTS
-------------------------------------------------------------------------------

UBC should become an event discovery platform.

Events may include:

• Sports
• Community gatherings
• Religious/community events where appropriate
• Social events
• Youth events
• Business events
• UBL events

Future event functionality:

• Event listing
• Event detail page
• Date/time
• Location
• Images
• Registration where needed
• Reminders/notifications

-------------------------------------------------------------------------------

13. COMMUNITY
-------------------------------------------------------------------------------

The platform should eventually have a community activity layer.

Potential content:

• Announcements
• Stories
• Achievements
• Photos
• UBL updates
• Events
• Community news

The goal is to make UBC worth revisiting even when no tournament event is happening.

-------------------------------------------------------------------------------

14. RESPONSIVE DESIGN — CORE REQUIREMENT
-------------------------------------------------------------------------------

UBC must NOT be treated as a desktop website that gets compressed onto mobile.

Responsive design is now a CORE product requirement.

Design experiences deliberately for:

1. PHONE
2. TABLET
3. DESKTOP

The underlying data and business logic remain shared.

The visual composition may change significantly between device classes.

-------------------------------------------------------------------------------

PHONE
-------------------------------------------------------------------------------

Target range approximately:

320px–767px

Priorities:

• Touch-first interactions
• Compact navigation
• Large tap targets
• Full-width content
• Horizontal card rails
• Mobile-friendly forms
• Bottom navigation where appropriate
• Simplified information density
• Collapsible sections
• Swipe interactions where useful

Do not simply shrink desktop components.

-------------------------------------------------------------------------------

TABLET
-------------------------------------------------------------------------------

Target range approximately:

768px–1199px

Tablets are NOT oversized phones.

Support:

• Portrait
• Landscape
• Two-column layouts where appropriate
• Larger navigation
• Touch-friendly controls
• Better use of available space

Examples include:

• iPad
• iPad Air
• Android tablets
• OnePlus tablets
• Samsung tablets

-------------------------------------------------------------------------------

DESKTOP
-------------------------------------------------------------------------------

Target:

1200px+

Support:

• Large grids
• Multi-column layouts
• Full navigation
• Rich information density
• Larger imagery
• Side panels
• Hover enhancements
• Wider content areas

Examples:

• Windows laptops
• MacBooks
• Desktop monitors
• Large displays

-------------------------------------------------------------------------------

RESPONSIVE PRINCIPLE
-------------------------------------------------------------------------------

Same DATA.

Same FUNCTIONALITY.

Different COMPOSITION when necessary.

Example:

Desktop player profile:

Photo + profile information + statistics side by side.

Mobile player profile:

Photo
Name
Team
Stats
Collapsible sections

Do not force identical layouts onto every device.

-------------------------------------------------------------------------------

15. RESPONSIVE BREAKPOINT THINKING
-------------------------------------------------------------------------------

Design should be validated across representative widths:

320px
375px
390px
430px

768px
834px
1024px

1280px
1440px
1920px
2560px

Do not design only around device names.

Design around layout behavior.

-------------------------------------------------------------------------------

16. TOUCH + INTERACTION
-------------------------------------------------------------------------------

Mobile/tablet interactions must be touch-friendly.

Avoid:

✗ Hover-only essential information
✗ Tiny controls
✗ Closely packed buttons
✗ Desktop-only interactions

Support:

• Touch targets
• Swipeable content
• Bottom sheets
• Touch-friendly tabs
• Accessible controls
• Clear feedback

Desktop hover states may be added as enhancements.

-------------------------------------------------------------------------------

17. DESIGN-FIRST WORKFLOW
-------------------------------------------------------------------------------

The development workflow is changing.

OLD WORKFLOW:

Describe UI
↓
Code UI
↓
Request visual changes
↓
Modify CSS
↓
Repeat

NEW WORKFLOW:

PRODUCT REQUIREMENTS
↓
DESIGN SYSTEM
↓
FIGMA
↓
RESPONSIVE DESIGNS
↓
COMPONENT ARCHITECTURE
↓
CODE
↓
FIREBASE DATA
↓
RESPONSIVE QA

Do not begin large UI implementations without establishing the intended
design first.

-------------------------------------------------------------------------------

18. FIGMA
-------------------------------------------------------------------------------

Figma becomes the primary visual design environment.

Use Figma to design:

• Homepage
• Player profiles
• Team pages
• Business pages
• Events
• Community
• Login
• Player dashboard
• Admin dashboard
• Mobile layouts
• Tablet layouts
• Desktop layouts

Design exact:

• Positioning
• Spacing
• Typography
• Colors
• Borders
• Shadows
• Radius
• Icons
• Images
• Interaction states
• Responsive behavior

The goal is to reduce repeated "move this / make this bigger / change this"
iterations in code.

-------------------------------------------------------------------------------

FIGMA RESPONSIVE DESIGN
-------------------------------------------------------------------------------

For important screens, design three intentional compositions:

PHONE
TABLET
DESKTOP

Do not merely create one desktop design and ask the code to "make it
responsive."

The designs should communicate intended layout behavior.

-------------------------------------------------------------------------------

19. UBC DESIGN SYSTEM
-------------------------------------------------------------------------------

Create a central UBC Design System before large-scale page development.

-------------------------------------------------------------------------------

BRAND TOKENS
-------------------------------------------------------------------------------

Define:

• Primary
• Secondary
• Background
• Surface
• Text
• Muted text
• Border
• Success
• Warning
• Error
• Accent / Gold

-------------------------------------------------------------------------------

TYPOGRAPHY TOKENS
-------------------------------------------------------------------------------

Define:

• Display
• Heading 1
• Heading 2
• Heading 3
• Body
• Caption
• Label

-------------------------------------------------------------------------------

SPACING TOKENS
-------------------------------------------------------------------------------

Use a consistent spacing system.

Example scale:

4
8
12
16
24
32
48
64

Exact values may be refined in Figma.

-------------------------------------------------------------------------------

RADIUS TOKENS
-------------------------------------------------------------------------------

Define:

• Small
• Medium
• Large
• Extra Large
• Full

-------------------------------------------------------------------------------

COMPONENT SYSTEM
-------------------------------------------------------------------------------

Create reusable:

• Buttons
• Cards
• Player cards
• Team cards
• Business cards
• Event cards
• Stat cards
• Badges
• Avatars
• Inputs
• Dialogs
• Tabs
• Navigation
• Sheets
• Dropdowns
• Loading states
• Empty states

One component should be reused rather than recreating similar UI repeatedly.

-------------------------------------------------------------------------------

20. REUSABLE UI / OPEN SOURCE
-------------------------------------------------------------------------------

Do not build every UI primitive from scratch.

Use reputable reusable component libraries where appropriate.

Preferred direction:

• shadcn/ui
• Existing project components
• Carefully selected open-source components

Important:

Never blindly copy an entire GitHub application/template.

Before reusing external code:

1. Check license.
2. Check architecture.
3. Extract only what is useful.
4. Adapt it to UBC.
5. Keep ownership of the final component.
6. Avoid introducing unnecessary dependencies.

The objective is:

REUSE COMPONENTS

not:

COPY ENTIRE PROJECTS.

-------------------------------------------------------------------------------

21. COMPONENT-FIRST DEVELOPMENT
-------------------------------------------------------------------------------

Build systems that can generate many pages from one template.

Examples:

PLAYER PROFILE TEMPLATE
→ 104+ players

TEAM TEMPLATE
→ 8 teams

BUSINESS TEMPLATE
→ potentially hundreds of businesses

EVENT TEMPLATE
→ unlimited events

Do not manually design each entity page.

-------------------------------------------------------------------------------

22. MOBILE / TABLET / DESKTOP COMPONENT STRATEGY
-------------------------------------------------------------------------------

Components may share data and business logic while changing presentation.

Example:

PlayerProfile
 ├── Desktop composition
 ├── Tablet composition
 └── Mobile composition

Do not create three completely independent applications.

One platform.

Shared logic.

Responsive presentation.

-------------------------------------------------------------------------------

23. PWA
-------------------------------------------------------------------------------

The web application should become a polished Progressive Web App.

Goals:

• Installable
• Fast
• Mobile-friendly
• Offline-aware where appropriate
• App-like navigation
• Proper icons
• Proper manifest
• Splash/launch experience where supported

PWA work should happen before native application packaging.

-------------------------------------------------------------------------------

24. FUTURE MOBILE APPLICATIONS
-------------------------------------------------------------------------------

Long-term goal:

UBC available on:

• Web
• Android
• iOS

Do NOT build native apps immediately.

First:

1. Build the web platform properly.
2. Make it responsive.
3. Make it PWA-ready.
4. Stabilize authentication.
5. Stabilize data architecture.
6. Stabilize player/business/event systems.
7. Then package/develop mobile experiences.

-------------------------------------------------------------------------------

ANDROID
-------------------------------------------------------------------------------

Potential future approach:

PWA / Trusted Web Activity initially if appropriate.

The Android app should use the same backend.

-------------------------------------------------------------------------------

IOS
-------------------------------------------------------------------------------

iOS should eventually provide a meaningful app experience rather than simply
being a basic website wrapper.

Potential native capabilities:

• Push notifications
• Deep links
• Native sharing
• Notification handling
• Camera/photo features
• Better offline behavior
• App-specific navigation

Final implementation should respect current App Store requirements.

-------------------------------------------------------------------------------

25. URL / DEEP LINK STRATEGY
-------------------------------------------------------------------------------

Public URLs should remain useful even when mobile apps exist.

Examples:

/ubl
/players/P73
/teams/rr
/businesses/...
/events/...

If the app is installed:

→ open the relevant native app screen.

If not:

→ open the web page.

One UBC identity across web and mobile.

-------------------------------------------------------------------------------

26. NOTIFICATIONS — FUTURE
-------------------------------------------------------------------------------

Notifications should eventually become a major retention mechanism.

Examples:

• Your team plays tomorrow.
• Match starting soon.
• Match result.
• Player statistics updated.
• New community event.
• New business promotion.
• Important UBC announcement.

Notifications should be personalized based on account/team/profile relationships.

-------------------------------------------------------------------------------

27. AUCTION SYSTEM — STATUS
-------------------------------------------------------------------------------

The auction system is COMPLETE and should be preserved.

Existing systems include:

• Auction Store
• Live bidding
• Player selection
• Sold
• Unsold
• Team purse
• Live display
• Broadcast
• Auction admin

DO NOT rebuild the auction engine.

DO NOT create another auction state system.

DO NOT duplicate Firebase auction state.

DO NOT reset the auction.

-------------------------------------------------------------------------------

AUCTION DATA FLOW
-------------------------------------------------------------------------------

Auction state historically followed:

Player
↓
Live
↓
Bid
↓
Going Once
↓
Going Twice
↓
Sold / Unsold
↓
Team Updated
↓
Purse Updated
↓
Recent Sales Updated
↓
Progress Updated

Never duplicate auction state.

-------------------------------------------------------------------------------

28. DISPLAY SCREEN
-------------------------------------------------------------------------------

The old Display Screen was created specifically for the live auction event.

It is no longer required for normal day-to-day platform operation.

Do NOT prioritize further development of the Display Screen.

Do NOT delete it immediately.

Keep it preserved as:

• Historical auction functionality
• Possible future event/broadcast reuse
• Reference implementation for live-event presentation

Only reuse it if a future feature genuinely benefits from it.

-------------------------------------------------------------------------------

29. AUCTION ADMIN → ADMIN CONTROL CENTER
-------------------------------------------------------------------------------

The existing admin auction panel should eventually evolve into the central
UBC administration system.

Do not create a second unrelated admin system.

Extend the existing admin architecture.

The old auction utilities should eventually be separated from normal content
management.

Dangerous actions such as:

• Reset Tournament
• Clear Players

must be protected and clearly separated from normal content controls.

-------------------------------------------------------------------------------

30. FIREBASE / DATA PRINCIPLES
-------------------------------------------------------------------------------

Firebase remains the source of live application data.

Core collections/systems include:

• Players
• Teams
• Sales / auction data
• Auction metadata
• Future users
• Future player profiles
• Businesses
• Events
• Announcements
• Community content
• Sponsors

Do not duplicate authoritative data unnecessarily.

-------------------------------------------------------------------------------

31. PLAYER DATA MODEL — FUTURE
-------------------------------------------------------------------------------

Keep official player data separate from authentication.

Conceptually:

users/{uid}
↓
account information
↓
playerProfiles/{playerId}
↓
official player relationship

Official player records remain authoritative for:

• Player number
• Team
• Auction price
• Statistics
• Match data

Authentication remains:

• UID
• Email
• Provider
• Account state

Do not store the entire player profile in Firebase Auth.

-------------------------------------------------------------------------------

32. SECURITY
-------------------------------------------------------------------------------

Player accounts introduce authorization requirements.

Rules must ensure:

PLAYER:

Can edit:
• Allowed personal profile fields

Cannot edit:
• Team
• Auction price
• Official statistics
• Official player number
• Match results

ADMIN:

Can manage official data.

PUBLIC:

Can view approved public profile information.

Never trust client-side role checks alone.

-------------------------------------------------------------------------------

33. ACCESSIBILITY
-------------------------------------------------------------------------------

Accessibility is now part of the product quality requirement.

Future work must include:

• Keyboard navigation
• Focus states
• Accessible labels
• Contrast
• Screen reader semantics
• Touch target sizing
• Reduced motion consideration
• Form accessibility

Do not leave accessibility until the very end.

-------------------------------------------------------------------------------

34. PERFORMANCE
-------------------------------------------------------------------------------

Future optimization priorities:

• Image optimization
• Lazy loading
• Code splitting
• Efficient Firebase queries
• Avoid unnecessary real-time listeners
• Mobile performance
• Loading states
• Skeletons
• Caching where appropriate

The app should feel fast on average mobile hardware, not only on development
laptops.

-------------------------------------------------------------------------------

35. VISUAL SYSTEM ROADMAP
-------------------------------------------------------------------------------

VISUAL-001
Premium UBC background
🔴

VISUAL-002
Linen texture
🔴

VISUAL-003
Paper texture
🔴

VISUAL-004
Gold accents
🟠

VISUAL-005
Luxury typography
🔴

VISUAL-006
Premium shadows
🔴

VISUAL-007
Card elevation
🔴

VISUAL-008
Section dividers
🔴

VISUAL-009
Hero polish
🔴

VISUAL-010
Sponsor presentation
🟡

VISUAL-011
Owner cards
🟡

VISUAL-012
Player cards
🟡

VISUAL-013
Spacing consistency
🔴

VISUAL-014
Motion system
🔴

VISUAL-015
Loading states
🔴

VISUAL-016
Empty states
🔴

VISUAL-017
Responsive system
🔴

VISUAL-018
Mobile navigation
🔴

VISUAL-019
Tablet layouts
🔴

VISUAL-020
Desktop layouts
🔴

VISUAL-021
UBC Design Tokens
🔴

VISUAL-022
Figma Design System
🔴

-------------------------------------------------------------------------------

36. MOTION SYSTEM
-------------------------------------------------------------------------------

Motion should become deliberate rather than auction-specific.

Future motion:

• Page transitions
• Card reveal
• Scroll animations
• Button feedback
• Loading transitions
• Navigation transitions
• Profile transitions
• Match updates
• Live status indicators

Auction animations remain preserved.

Do not add animation simply because animation is possible.

-------------------------------------------------------------------------------

37. LOADING / EMPTY STATES
-------------------------------------------------------------------------------

Every major dynamic section should have:

• Loading state
• Empty state
• Error state
• Success state where appropriate

Examples:

No upcoming matches.

No businesses found.

No events yet.

Player statistics not available yet.

Do not leave blank areas or broken layouts.

-------------------------------------------------------------------------------

38. ADMIN CONTENT MODEL
-------------------------------------------------------------------------------

The long-term objective is to reduce hardcoded content.

Instead of:

Edit code
↓
Deploy
↓
Content changes

Move toward:

Admin
↓
Firebase
↓
Public application

Content that should eventually be editable:

• Homepage hero
• Announcements
• Events
• Promotions
• Featured businesses
• Sponsors
• Community posts
• UBL updates

-------------------------------------------------------------------------------

39. DEVELOPMENT WORKFLOW
-------------------------------------------------------------------------------

The project is no longer operating under an auction deadline.

Speed is still valuable.

But quality now has priority over emergency implementation.

NEW DEVELOPMENT LOOP:

1. Define product requirement.
2. Design in Figma.
3. Define mobile/tablet/desktop behavior.
4. Reuse existing components where appropriate.
5. Implement reusable components.
6. Connect real Firebase data.
7. Test desktop.
8. Test tablet.
9. Test mobile.
10. Verify functionality.
11. Update PROJECT_BRAIN.
12. Commit.
13. Deploy only after verification.

-------------------------------------------------------------------------------

40. SOURCE OF TRUTH
-------------------------------------------------------------------------------

PROJECT_BRAIN.md is the project roadmap and context file.

When PROJECT_BRAIN.md is provided in a future conversation:

• Read it first.
• Understand the current phase.
• Preserve completed systems.
• Follow the roadmap.
• Do not assume old auction priorities still apply.
• Do not revert finalized data.
• Do not redesign architecture without reason.
• Do not duplicate existing systems.

PROJECT_BRAIN should be updated after major milestones.

-------------------------------------------------------------------------------

41. ITERATION RULE
-------------------------------------------------------------------------------

Maximum five implementation tasks per iteration.

Each task must include:

• Feature ID
• Files
• Exact changes
• Expected result

Avoid generic advice.

Avoid unnecessary explanation.

Prefer implementation-focused guidance.

-------------------------------------------------------------------------------

42. CURRENT PHASE
-------------------------------------------------------------------------------

CURRENT PHASE:

UBC 2.0 PRODUCT DESIGN & FOUNDATION

The auction is complete.

The final auction data is archived and reconciled.

The next priority is NOT adding random features.

The next priority is establishing the foundation for the new UBC platform.

-------------------------------------------------------------------------------

43. NEXT DEVELOPMENT ORDER
-------------------------------------------------------------------------------

PHASE 1 — PRODUCT FOUNDATION

1. Finalize UBC product architecture.
2. Finalize information architecture.
3. Define UBC Design System.
4. Establish Figma workspace/design system.
5. Define responsive design rules.
6. Define component library strategy.

-------------------------------------------------------------------------------

PHASE 2 — HOMEPAGE

Redesign homepage around UBC rather than auction.

Remove auction-first presentation.

Build:

• UBC hero
• What's happening
• UBL section
• Businesses
• Events
• Community updates
• Sponsors
• Footer

Design mobile/tablet/desktop simultaneously.

-------------------------------------------------------------------------------

PHASE 3 — UBL

Build:

• Teams
• Player discovery
• Fixtures
• Results
• Points table
• Match centre
• Statistics
• Awards
• Gallery

-------------------------------------------------------------------------------

PHASE 4 — PLAYER IDENTITY

Build:

• Firebase authentication
• Google login
• Email login
• Player account claiming
• Player profiles
• Official vs editable profile fields
• Player dashboard
• Player/team relationships

-------------------------------------------------------------------------------

PHASE 5 — BUSINESSES

Build:

• Directory
• Search
• Categories
• Business profiles
• Featured businesses
• Promotions

-------------------------------------------------------------------------------

PHASE 6 — EVENTS + COMMUNITY

Build:

• Events
• Event details
• Community updates
• Announcements
• Stories
• Community activity

-------------------------------------------------------------------------------

PHASE 7 — ADMIN CONTROL CENTER

Evolve existing admin.

Build:

• Dashboard
• Content management
• Players
• Player accounts
• Teams
• UBL
• Businesses
• Events
• Sponsors

Preserve auction controls separately.

-------------------------------------------------------------------------------

PHASE 8 — PWA + NOTIFICATIONS

Build:

• Installability
• Notifications
• Deep links
• Offline improvements
• App-like navigation

-------------------------------------------------------------------------------

PHASE 9 — MOBILE APPLICATIONS

Only after the web platform is mature.

Target:

• Android
• iOS

Use the same backend/data model.

-------------------------------------------------------------------------------

44. CURRENTLY COMPLETED
-------------------------------------------------------------------------------

AUCTION:

✅ Auction completed
✅ Final player reconciliation
✅ Final team reconciliation
✅ 104 sold
✅ 47 unsold
✅ Team squads finalized
✅ Team purses finalized
✅ Firebase data synchronized
✅ Auction data audit passed
✅ Git archive checkpoint created

-------------------------------------------------------------------------------

45. CURRENTLY IN PROGRESS
-------------------------------------------------------------------------------

🟡 UBC 2.0 planning

🟡 Product architecture

🟡 Design system planning

🟡 Figma-first workflow planning

🟡 Responsive strategy

🟡 Player identity architecture

🟡 Admin evolution strategy

-------------------------------------------------------------------------------

46. NOT TO BE DONE YET
-------------------------------------------------------------------------------

Do NOT immediately:

✗ Build native iOS app
✗ Build native Android app
✗ Rewrite Firebase
✗ Rewrite auction engine
✗ Replace routing architecture
✗ Delete auction display system
✗ Delete auction admin
✗ Create duplicate authentication systems
✗ Create duplicate data systems
✗ Copy an entire GitHub template
✗ Build every page before designing the system

-------------------------------------------------------------------------------

47. PRODUCT PRINCIPLE
-------------------------------------------------------------------------------

UBC should become something people WANT to open.

Not something they only open because there is a match.

Not something they only open because there is an auction.

The product should continuously provide reasons to return:

• Sports
• Players
• Teams
• Events
• Businesses
• Community
• Updates
• Notifications
• Personal profiles

-------------------------------------------------------------------------------

48. FINAL PRODUCT VISION
-------------------------------------------------------------------------------

The long-term UBC ecosystem:

                         UBC
                          │
        ┌─────────────────┼─────────────────┐
        ↓                 ↓                 ↓
      SPORTS          COMMUNITY         BUSINESS
        │                 │                 │
       UBL             EVENTS           DIRECTORY
        │              UPDATES          PROMOTIONS
      TEAMS            STORIES          PROFILES
     PLAYERS
        │
   STATISTICS
        │
     MATCHES

                         │
                         ↓
                     ACCOUNTS
                         │
             ┌───────────┼───────────┐
             ↓           ↓           ↓
           PLAYER      MEMBER      ADMIN

                         │
                         ↓
                    FIREBASE

                         │
          ┌──────────────┼──────────────┐
          ↓              ↓              ↓
         WEB            PWA        MOBILE APPS