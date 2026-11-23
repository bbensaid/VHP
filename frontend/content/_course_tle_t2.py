exec(open('CONTENT_TEMPLATE.py').read())
exec(open('frontend/content/_course_tle_common.py').read())

# Track 2 — Implementation Science. Verified 2026-11-23 via search/summaries: CFIR 2022 update (Damschroder et al., Implementation Science, Oct 2022; feedback survey of
# experienced users; revisions, added determinants for equity, centering innovation recipients; constructs map back to original CFIR; separate Outcomes Addendum);
# IHI Model for Improvement (three questions; PDSA; Shewhart/Deming origin; Langley et al., The Improvement Guide 2nd ed. 2009; questions can be addressed in any order);
# Greenhalgh et al., Milbank Quarterly 82(4):581-629 (2004), meta-narrative review; diffusion passive vs dissemination/implementation active; sustainability literature sparse.
# Vermont RHT: application includes a Clinically Integrated Network of Shared Services (search of AHS presentations; shared EMR incentives, closed-loop referral).

L8_SLUG = 'tl-implementation-science-cfir'
L8_TITLE = 'Why Good Plans Fail: Implementation Science and the CFIR'
L8 = [
    blk('intro1', "Chapter 12 opens with a claim that most experienced managers recognize: healthcare transformation fails more often because of change management than because of analysis. The analysis is usually adequate, it says, because the evidence on what needs to change is strong and consistent. What fails is the sequence, pace and management of human and institutional change. That claim has a scholarly home, a field called implementation science, which studies why proven practices do not reach routine use and what organizations can do about it."),
    blk('intro2', "This lesson introduces that field through its most widely used framework, the Consolidated Framework for Implementation Research, known as the CFIR. It explains what the framework is for, how its 2022 update changed it, how to turn it into a practical diagnostic for an organization facing a mandatory payment change and where it stops being useful. The descriptions of the framework come from the authors' 2022 update paper and the user guide that accompanies it, read through summaries; the Vermont illustration is the lesson's own and is labelled as such."),
    blk('intro3', "The aim is a habit of asking, before a plan is launched, what in the setting will help it and what will block it."),

    h2('s1h1', 'What Implementation Science Is For'),
    blk('s1p1', "Implementation science asks a question that evaluation research usually leaves aside. Evaluation asks whether an intervention works. Implementation research asks whether it is being used as intended, by whom, in which settings and why not elsewhere. The distinction matters in transformation because the interventions in this book are generally not mysterious. Care coordination, structured data capture, reference-based pricing and global budgets all have descriptions, and some have evidence. The difficulty is getting a hospital, a practice or an agency to run them reliably with the staff and systems it has."),
    blk('s1p2', "Chapter 12 says the same thing in its own vocabulary. It describes a gap between understanding and doing, and argues that advice without execution support is worth little, that tools without change management deliver data without insight and that education without organizational capacity produces informed spectators. Implementation science supplies a vocabulary for each of those failures. A tool that is not used is a problem of fit with the inner setting. Advice that is not followed is a problem of the implementation process. A mandate that is met on paper but not in practice is a problem of how individuals understand and accept the change."),
    callout('s1c1', "A plan describes what should happen. Implementation science asks what in the setting will make it happen, or not."),

    h2('s2h1', 'The Framework and Its 2022 Update'),
    blk('s2p1', "The CFIR was first published in 2009 as a way to gather the many scattered theories of implementation into a single menu of factors that can help or hinder. It is a determinant framework: a checklist of things worth examining, organized into domains, and not a theory that predicts outcomes. In October 2022 the authors published an update in the journal Implementation Science. According to the paper, it was based on feedback from experienced users of the framework, gathered through a survey that drew responses from about forty percent of the authors contacted. The revisions modified, added, removed and relocated constructs."),
    blk('s2p2', "The update responded to several critiques. It gave more attention to the people who receive an innovation, and it added determinants related to equity in implementation, which means that a user can ask who is advantaged or disadvantaged by how a change is rolled out. The authors state that the constructs can be mapped back to the original framework so that studies remain comparable over time. A companion addendum on outcomes separates implementation outcomes, such as whether staff adopt a practice, from innovation outcomes, such as whether patients get better. That separation is useful for managers: a program can succeed at implementation and fail at its clinical aim, or the reverse."),
    blk('s2p3', "The framework arranges its constructs in five domains: the innovation itself, the outer setting, the inner setting, the individuals involved and the implementation process. The innovation domain asks about the thing being implemented, including its evidence base, its complexity and its fit. The outer setting covers the external context, such as regulators, payers, policy and community needs. The inner setting covers the implementing organization's culture, resources, communication and readiness. The individuals domain covers the roles and characteristics of the people carrying out and receiving the change. The process domain covers planning, engaging, executing and reflecting. A practitioner should confirm the current construct list in the paper before building a formal instrument."),
    table('s2t1', 'The five CFIR domains as a diagnostic menu (summarized from the 2022 update)', [
        {'Domain': 'Innovation', 'Question_to_ask': 'What exactly is being implemented, and how well does it fit here?'},
        {'Domain': 'Outer setting', 'Question_to_ask': 'What do regulators, payers, patients and policy demand or allow?'},
        {'Domain': 'Inner setting', 'Question_to_ask': 'What do our culture, structure, resources and communication help or hinder?'},
        {'Domain': 'Individuals', 'Question_to_ask': 'Who must change what they do, and what do they believe about it?'},
        {'Domain': 'Implementation process', 'Question_to_ask': 'How will we plan, engage people, carry out the change and learn from it?'},
    ]),

    h2('s3h1', 'Turning the Framework Into a Diagnostic'),
    blk('s3p1', "A framework helps only when it is converted into questions someone will answer. The user guide that accompanies the framework describes a five-step approach to using it in research, and a manager can borrow the logic without the research apparatus. Choose the domains and constructs relevant to the decision. Gather information from the people who will carry out the change, not only from leaders. Rate each factor as a help, a hindrance or neutral, with a note on the evidence. Then ask which hindrances are within the organization's control and which are not."),
    blk('s3p2', "Consider an illustrative example, which is the lesson's own and not a description of any real hospital. A rural hospital must prepare for a fixed-revenue payment model. The innovation is complex, since it changes how revenue arrives, and its evidence in rural settings is limited. The outer setting is partly hostile, because federal approval and state timelines can shift. The inner setting has a finance team with deep expertise in volume-based billing and little experience with population risk, and a medical staff that learned of the change through a newsletter. The individuals include a chief executive who is convinced, a chief financial officer who is anxious and clinicians who see little connection to their work. The process has a plan but no testing period."),
    blk('s3p3', "Laid out this way, the diagnostic suggests different actions than a general call for change. The hospital can do little about federal approval timing, so it should plan for scenarios. It can do much about the inner setting by involving clinicians early and by building the finance team's population risk skills. It can improve the process by adding small tests and a review point. The exercise converts a vague worry that the change may not stick into a short list of things to do and things to watch."),
    steps('s3st1', 'A one-hour implementation diagnostic for a leadership team', [
        ('Name the change precisely', 'Write one sentence on what will be different for patients, staff and revenue.'),
        ('Walk the five domains', 'List helps and hindrances under each, with a note on how you know.'),
        ('Hear from the front line', 'Ask three people who do the work what would make this fail.'),
        ('Sort by control', 'Mark each hindrance as within our control, partly or outside it.'),
        ('Choose the first three actions', 'Pick actions on hindrances you can change, with owners and dates.'),
    ]),

    h2('s4h1', 'Equity and the People Who Receive the Change'),
    blk('s4p1', "The 2022 update's attention to equity and to the recipients of innovations deserves a manager's attention. Transformation changes things for patients, such as where services are offered, how care is coordinated and how costs are shared. A rollout designed around the convenience of the organization can unintentionally disadvantage patients who are rural, low-income, disabled, non-English speaking or distrustful of institutions. Treating equity as a determinant, which the framework now invites, means asking before implementation who might be left out and what would show it."),
    blk('s4p2', "In practice, this is a short set of questions added to the diagnostic. Who will be reached by this change first, and who last? Which groups already have worse access or outcomes, and could the change widen the gap? Who from those groups has been asked about the design? What data will show whether the change is reaching them? The same questions apply to staff. A new workflow that suits day-shift physicians may not suit night-shift nurses or part-time community health workers, and its adoption will reflect that."),
    warning('s4w1', "A determinant list is not a prediction", "The framework tells you what to examine. It does not tell you the weights, so use judgment and local knowledge, and test your conclusions in small steps."),

    h2('s5h1', 'Limits and Practical Cautions'),
    blk('s5p1', "Frameworks can become paperwork. A team that fills a long checklist once and files it has gained little. The better use is as a recurring conversation: revisit the diagnostic at each stage, add what has been learned and retire factors that no longer matter. Keep it short enough to be used. Five domains, a dozen questions and a page of notes are enough for most decisions."),
    blk('s5p2', "It is also worth remembering that the framework comes from research settings, much of it in clinical and public health programs, and that the evidence for how well any determinant predicts success in a given situation varies. Chapter 12's own advice is consistent with this modesty: analysis and tools matter, but they have to be joined to change management, and the joining is done by people who know the organization. Use the framework to organize that knowledge, not to replace it."),
    blk('s5p3', "Finally, connect the diagnostic to the other tools in this course. The Kotter steps from the first track describe a sequence of leadership actions. The improvement method in the next lesson describes how to test changes in small steps. The diffusion lesson describes how an innovation spreads once it works. Implementation science is the thread that shows how each depends on the setting. A leader who can diagnose the setting, test a change, learn from the test and help it spread has most of what Chapter 12 means by implementation capacity."),

    takeaway('tw', [
        "Chapter 12 says transformation fails more often from change management than from analysis; implementation science is the field that studies why proven practices do not reach routine use.",
        "The CFIR is a determinant framework: a menu of factors that can help or hinder implementation, not a predictive theory.",
        "The October 2022 update, based on feedback from experienced users, revised constructs, centered innovation recipients and added determinants related to equity.",
        "Its five domains are the innovation, the outer setting, the inner setting, the individuals involved and the implementation process.",
        "Separate implementation outcomes (is it used?) from innovation outcomes (does it help patients?); either can succeed without the other.",
        "Convert the framework into a short diagnostic, gather views from the front line and sort hindrances by what you can control.",
        "Keep the framework light and recurring; it organizes local knowledge and does not replace judgment.",
    ]),
    quiz('qz',
        "What is the CFIR best described as?",
        [
            ("A payment model that sets hospital budgets", False),
            ("A determinant framework: a menu of factors, organized in domains, that can help or hinder implementation", True),
            ("A predictive formula that scores whether a program will succeed", False),
            ("A federal regulation on change management", False),
        ],
        "The CFIR collects factors that influence implementation into domains for examination. It guides diagnosis but does not predict outcomes or assign weights."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] " + BOOK12 + " — §12.1 The Gap Between Understanding and Doing; §12.4 The Change Management Science Behind Healthcare Transformation"),
    blk('src2', "[2] Damschroder LJ et al. The updated Consolidated Framework for Implementation Research based on user feedback. Implementation Science, October 2022 — https://pmc.ncbi.nlm.nih.gov/articles/9617234 — as summarized in search results"),
    blk('src3', "[3] Reardon CM, Damschroder LJ et al., The Consolidated Framework for Implementation Research User Guide: a five-step guide for conducting implementation research using the framework — https://geiselmed.dartmouth.edu/dcis/wp-content/uploads/sites/104/2026/02/The-Consolidated-Framework-for-Implementation-Research-User-Guide-a-five-step-guide-for-conducting-implementation-research-using-the-framework.pdf"),
    blk('src4', "[4] HTR Research Lab, VBC Readiness Assessment — https://healthtransformationreview.org/research-lab/knowledge-workspace?tab=readiness — a 30-dimension readiness diagnostic to pair with the five-domain exercise"),
]

L9_SLUG = 'tl-improvement-model-pdsa'
L9_TITLE = 'Testing Before Scaling: The Model for Improvement and PDSA'
L9 = [
    blk('intro1', "Chapter 12 describes what it calls the transformation pace problem: how fast an organization can change, and what happens when the required pace exceeds its capacity. One of the best-tested answers to that problem is to change in small steps that can be reversed. The Model for Improvement, developed by Langley and colleagues and promoted by the Institute for Healthcare Improvement, gives a simple structure for doing so. It asks three questions and tests answers through Plan-Do-Study-Act cycles."),
    blk('intro2', "This lesson explains the three questions, the four steps of the cycle, the kinds of measures a team should use, how to scale a test that works and how to apply the model to a transformation program, using a transition-call example. The description of the model follows IHI and public-sector summaries; the example is illustrative."),
    blk('intro3', "The method is old and plain, which is part of its value: a leader can start it on Monday with a nurse, a clipboard and a week."),

    h2('s1h1', 'The Three Questions'),
    blk('s1p1', "The model begins with three questions. What are we trying to accomplish? How will we know that a change is an improvement? What changes can we make that will result in improvement? The first sets an aim, and a useful aim is specific about what, for whom and by when. The second sets measures, so that a team does not rely on impressions. The third generates change ideas to test. According to IHI and public health system summaries, the questions can be addressed in any order, though teams usually start with the aim, and the team moves back and forth between them as it learns."),
    blk('s1p2', "A weak aim says that the hospital will improve care transitions. A stronger aim says that the hospital will contact eighty percent of discharged attributed patients within two business days, within six months. The second can be measured, delegated and tested. In Chapter 12's terms, the strong aim turns transformation from an aspiration into a task someone can own. It also exposes capacity problems early, since an aim that cannot be staffed shows itself quickly."),
    callout('s1c1', "If you cannot say what you are trying to accomplish and how you will know, you are not ready to test a change."),

    h2('s2h1', 'The PDSA Cycle'),
    blk('s2p1', "A change idea is tested through a cycle with four steps. In Plan, the team states what it will test, who will do it, when and what it predicts will happen. In Do, it carries out the test on a small scale and records what happened, including problems. In Study, it compares results with the prediction and discusses what was learned. In Act, it decides whether to adopt the change, adapt it or abandon it, and plans the next cycle. The cycle's origins are in manufacturing quality work, where it was known as the Shewhart cycle and later adapted by Deming into the version used in health care."),
    blk('s2p2', "The prediction matters more than it seems. A team that writes down what it expects learns from being wrong, which is where most of the learning comes from. A team that does not predict tends to find that whatever happened is what it expected. Small scale is the other essential: one nurse, one unit and one week, not the whole hospital. The point of the first test is to find what breaks, which is cheaper to discover with five patients than with five hundred."),
    table('s2t1', 'A PDSA cycle for a post-discharge phone call (illustrative)', [
        {'Step': 'Plan', 'Example': 'One nurse will call ten discharged patients within two business days; predicted: seven will be reached'},
        {'Step': 'Do', 'Example': 'Calls made over one week; record reached, not reached, time spent, problems found'},
        {'Step': 'Study', 'Example': 'Four reached; wrong phone numbers on file were the main cause'},
        {'Step': 'Act', 'Example': 'Adapt: verify numbers before discharge; run the next cycle with twenty patients'},
    ]),

    h2('s3h1', 'Measures: Outcome, Process and Balancing'),
    blk('s3p1', "The second question, how will we know, is answered by a small family of measures. An outcome measure shows whether the aim is being met, such as the thirty-day readmission rate. A process measure shows whether the steps believed to produce the outcome are happening, such as the share of patients contacted in two business days. A balancing measure shows whether the change is causing a problem somewhere else, such as nurse overtime or missed calls from other patients. This three-part structure is common in improvement practice, and its value is that it prevents a team from celebrating a process gain that harms something else."),
    blk('s3p2', "Measurement in improvement work differs from research measurement. The aim is learning, not proof, so teams often use small samples, plot data over time and look for patterns on run charts, not for statistical significance. Measures should be collected frequently enough to guide the next test. A monthly rate is too slow for a one-week test, whereas a daily tally on a whiteboard may be enough. Results should be stratified by patient group from the start, so that equity gaps are visible early."),

    h2('s4h1', 'Scaling a Test That Works'),
    blk('s4p1', "Teams are tempted to move from a promising first test straight to full rollout. The usual guidance is to scale in stages: test with a few patients, then a unit, then several units, adapting at each step and watching whether results hold in different conditions. A change that works with an enthusiastic nurse on a quiet unit may fail with a tired team on a busy one. Each stage is a chance to find what the change needs, such as staffing, scripts, forms or support from the record system, before it is imposed on everyone."),
    blk('s4p2', "Scaling also involves deciding what is essential and what can be adapted. The core of a change, such as a call within two business days to review medications and book a visit, should stay fixed. The form, such as who calls and whether it is by phone or video, can vary with the site. Writing the core down protects it from erosion as the change spreads, and writing the variations down helps others learn which adaptations worked. This connects directly to the next lesson on spread, and to Chapter 12's concern that knowledge move from the more advanced organizations to those with fewer resources."),
    steps('s4st1', 'From first test to standard work', [
        ('Aim and measures', 'Write the aim, the outcome, process and balancing measures.'),
        ('Small test', 'One person, a handful of patients, one week; write a prediction.'),
        ('Study and adapt', 'Compare with the prediction; fix what broke; test again.'),
        ('Widen in stages', 'Move to a unit, then more units, watching for different conditions.'),
        ('Write the standard work', 'Record the core steps and permitted variations, then assign an owner.'),
    ]),

    h2('s5h1', 'Using the Model at Program Scale'),
    blk('s5p1', "A statewide or system-wide program is a collection of local tests plus the structure that connects them. A program office can use the Model for Improvement in three ways. It can require each project to state an aim, measures and a first test, which makes progress comparable and exposes projects with no testable aim. It can build in short learning cycles, so that findings reach other teams before the end of the year. And it can use the pace of learning as a management signal: a team running no tests in a quarter is probably stuck."),
    blk('s5p2', "This offers an answer to the pace problem. If required deadlines are fixed, the way to meet them with limited capacity is to learn faster, not to rush. A hospital that begins testing a transition workflow now will have a tested version by the time a payment change takes effect. A hospital that waits will face the change with an untested plan. The cost of the testing approach is leadership attention and some tolerance for imperfect early results, which is a cost worth paying when the alternative is a failed rollout."),
    blk('s5p3', "A caution is in order. The model is a method for improving processes, and it does not decide what is worth improving. A team that applies it diligently to the wrong aim will produce efficient waste. The aim should come from the strategic questions in the earlier tracks: what the payment change requires, what the community needs and what the organization can sustain. The model then helps the team learn how, one small test at a time."),

    takeaway('tw', [
        "The Model for Improvement asks what we are trying to accomplish, how we will know a change is an improvement and what changes we can make.",
        "The questions can be addressed in any order, though teams usually start with the aim, and they are revisited as the team learns.",
        "A PDSA cycle has four steps: plan with a prediction, do on a small scale, study the result against the prediction and act by adopting, adapting or abandoning.",
        "Use outcome, process and balancing measures so a gain in one place does not hide a harm in another.",
        "Scale in stages and write down the essential core of a change and its permitted variations.",
        "At program scale, require aims and measures from each project and use the pace of testing as a management signal.",
        "The model improves how a process works; it does not decide whether the process is worth improving.",
    ]),
    quiz('qz',
        "Why does a PDSA plan include a written prediction?",
        [
            ("Because regulators require it", False),
            ("Because comparing results with a prediction is where much of the learning comes from", True),
            ("Because predictions guarantee the test will succeed", False),
            ("Because the Study step can be skipped when predictions are made", False),
        ],
        "Writing what you expect lets the team see where its understanding was wrong. Without a prediction, teams tend to treat whatever happened as expected."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] " + BOOK12 + " — §12.4.2 The Transformation Pace Problem"),
    blk('src2', "[2] Institute for Healthcare Improvement, Model for Improvement — https://www.ihi.org/resources/how-to-improve ; Langley GJ et al., The Improvement Guide, 2nd ed. (2009), as cited by IHI"),
    blk('src3', "[3] Agency for Healthcare Research and Quality, The Improvement Cycle: Plan-Do-Study-Act — https://www.ahrq.gov/cahps/improvement-guide/improvement-models/plan-do-study-act.html"),
    blk('src4', "[4] NSW Clinical Excellence Commission, Model for Improvement and PDSA cycles — https://www.cec.health.nsw.gov.au/CEC-Academy/quality-improvement-tools/model-for-improvement-and-pdsa-cycles"),
]

L10_SLUG = 'tl-diffusion-and-spread'
L10_TITLE = 'Why Innovations Spread, or Do Not: Diffusion in Health Organizations'
L10 = [
    blk('intro1', "Chapter 12's closing implications make an unusual demand of Vermont's larger health systems: participating in knowledge transfer is not optional generosity but a system obligation. Fragile hospitals serve the populations whose outcomes most need to improve, so a transformation that only works in the strongest institutions cannot produce statewide results. That raises a practical question. What makes an innovation spread from one organization to others, and what stops it?"),
    blk('intro2', "A large body of research addresses this. The best-known synthesis in health services is the 2004 systematic review by Greenhalgh and colleagues in the Milbank Quarterly, which asked how innovations in health service organizations can be spread and sustained. This lesson draws on that review's framing, on the older diffusion of innovations tradition and on Vermont's own plan for shared services, as described in public presentations. The lesson did not read the review's full text, so its description of the model is limited to what the abstract and summaries state."),
    blk('intro3', "The lesson's practical point is that spread is a managed process, and that passive hope is the usual reason good ideas stay local."),

    h2('s1h1', 'Diffusion, Dissemination and Implementation'),
    blk('s1p1', "The 2004 review draws a distinction that is useful for planning. Diffusion is the passive, unplanned spread of an innovation. Dissemination and implementation are active and planned: dissemination is the effort to spread information and implementation the effort to get an innovation used. A great deal of healthcare transformation assumes diffusion, as when a state publishes a promising result and expects others to follow. The research suggests that diffusion is slow and uneven, and that active effort is usually needed for adoption in complex organizations."),
    blk('s1p2', "The authors faced a literature that was large, varied and drawn from many disciplines, with different standards of success. They developed a method they called a meta-narrative review, which relies on narrative synthesis, not statistical pooling. They reported three outputs: a parsimonious, evidence-based model for thinking about diffusion in health service organizations, a list of knowledge gaps and a methodology for reviewing health service policy and management. They also noted that the literature on sustaining service innovations was very sparse, which remains a caution for anyone promising that a transformation will last."),
    callout('s1c1', "Publishing a result is dissemination at best. Getting it used in another organization is implementation, and takes a different kind of effort."),

    h2('s2h1', 'What Shapes Adoption'),
    blk('s2p1', "The review's model organizes determinants around several features: the innovation itself, the people who adopt it, how it is communicated and influenced, the organization's readiness and context and how it is implemented and made routine. In the older diffusion tradition associated with Everett Rogers, attributes of an innovation that predict adoption include its relative advantage over current practice, its compatibility with existing values and routines, its complexity, whether it can be tried on a small scale and whether results can be seen. These attributes are widely cited, and they translate directly into questions a program office can ask."),
    blk('s2p2', "Take compatibility and complexity. A closed-loop referral system that fits how a practice already schedules and tracks patients has a good chance of adoption. One that requires a new login, a separate screen and extra data entry will be bypassed under pressure, whatever its merits. Take trialability: a shared service that a hospital can try for one department before committing the whole organization lowers the risk of adoption. Take observability: when a peer hospital shows concrete results in a form the audience trusts, adoption becomes more likely. Each of these can be designed in."),
    table('s2t1', 'Innovation attributes that influence adoption, and what a program can do', [
        {'Attribute': 'Relative advantage', 'Design_response': 'Show the advantage in terms the adopter cares about, such as time saved or revenue protected'},
        {'Attribute': 'Compatibility', 'Design_response': 'Fit existing workflows and records; adapt before asking adopters to adapt'},
        {'Attribute': 'Complexity', 'Design_response': 'Simplify; give clear steps and training; start with a minimal version'},
        {'Attribute': 'Trialability', 'Design_response': 'Offer a small-scale or time-limited trial'},
        {'Attribute': 'Observability', 'Design_response': 'Share results from trusted peers in comparable settings'},
    ]),

    h2('s3h1', 'Adopters, Networks and Influence'),
    blk('s3p1', "Rogers described adopters as falling into categories by how early they take up an innovation: innovators, early adopters, an early majority, a late majority and laggards. The proportions in his classification are often quoted, but the practical lesson is simpler. People adopt at different speeds for good reasons, and those who adopt early are often not typical of those who follow. An innovation piloted only by enthusiasts may look more successful than it will be in the median hospital, which has fewer staff and less slack. Programs should therefore test in typical settings as well as eager ones."),
    blk('s3p2', "The review also stresses communication and influence. Innovations spread through networks of trust, and the credibility of the messenger matters. A message from a peer physician who has used the change carries more weight than a memo. This supports Chapter 12's emphasis on clinical leadership and the earlier course lessons on stakeholder management. It also suggests that knowledge transfer programs should link people, such as pairing a chief nursing officer from a hospital that has run a program with a counterpart in one beginning it, rather than only distributing documents."),
    blk('s3p3', "Opinion leaders can be allies or obstacles. Mapping who influences whom in a system, formally and informally, is a practical step. A hospital chief medical officer may be formally senior, while an informal leader among the hospitalists may decide whether a new protocol is used. Engaging both is a matter of respect and of strategy."),

    h2('s4h1', "Vermont's Shared Services as a Spread Mechanism"),
    blk('s4p1', "Vermont's Rural Health Transformation application includes, as one of its initiative categories, a clinically integrated network of shared services. According to public presentations by the Agency of Human Services, as surfaced by search, the shared-services work includes incentives for adopting a shared electronic record platform and a statewide closed-loop referral system. This lesson did not read those presentations in full, and details may have changed. The structural idea is clear. A shared service lets a capability built once be used by many organizations, which is a planned mechanism of spread."),
    blk('s4p2', "Seen through the diffusion lens, the design questions are familiar. Is the shared service compatible with the workflows of small independent hospitals and practices? Can an organization try part of it before committing? Will results be visible to peers in forms they trust? Who are the opinion leaders whose adoption will lead others? And what happens after the capital arrives, since the sustaining literature is sparse and bridge funding ends? Chapter 12 states the principle that shared infrastructure is the mechanism by which investments made at advanced hospitals become available to smaller ones, and the research indicates it will work only if these adoption questions are managed."),
    blk('s4p3', "A related point concerns obligation. Chapter 12 says that larger systems have a system obligation to participate in knowledge transfer. In diffusion terms, that means that their staff and results are part of the influence network, and that they are also well placed to run the early tests that smaller organizations cannot afford. The incentives for them to share are not automatic: sharing costs time and may help competitors. A program that expects participation should say what the larger organizations gain, which may include system stability, referral relationships and recognition."),

    h2('s5h1', 'A Spread Plan'),
    steps('s5st1', 'Planning for spread from the beginning', [
        ('Describe the core', 'Write what must stay the same for the change to work.'),
        ('Assess adopters', 'List who might adopt, their readiness and what would help them.'),
        ('Design for fit', 'Adjust the change to compatibility, complexity and trial needs.'),
        ('Link people', 'Pair early adopters with new adopters and fund the time.'),
        ('Show results', 'Share measured outcomes in forms peers trust.'),
        ('Plan for after the grant', 'Decide who pays and maintains the change when start-up funds end.'),
    ]),
    blk('s5p1', "A spread plan written at the start of a program is far better than one improvised after the pilot ends. It forces the team to ask whether the pilot is typical, whether the intervention can run without the pilot's extra support and what it would cost at scale. It also protects against a frequent failure, in which a successful demonstration depends on resources, such as a dedicated project manager, that will not exist elsewhere."),
    blk('s5p2', "Finally, measure spread itself. Track how many organizations have heard of the change, how many have tried it, how many use it as designed after six months and how many have dropped it and why. Those numbers are as informative as clinical outcomes, because a good intervention used by few has little effect on the state, and a modest one used by many can matter greatly. Chapter 12's insistence that transformation infrastructure be in place before workloads peak applies to spread: the channels must exist before the changes they are meant to carry."),

    takeaway('tw', [
        "Chapter 12 calls participation in knowledge transfer a system obligation of Vermont's larger health systems.",
        "Diffusion is passive spread; dissemination and implementation are active, planned efforts, which complex organizations usually need.",
        "The 2004 Milbank Quarterly review used a meta-narrative method and found the literature on sustaining innovations very sparse.",
        "Attributes that influence adoption include relative advantage, compatibility, complexity, trialability and observability, and each can be designed in.",
        "Pilots run only by enthusiasts may overstate success; test in typical settings and map informal influence as well as formal authority.",
        "Vermont's Rural Health Transformation application includes a clinically integrated network of shared services, a planned spread mechanism whose details should be confirmed.",
        "Write a spread plan at the start, including who pays after start-up funds end, and measure spread itself.",
    ]),
    quiz('qz',
        "How does the 2004 Greenhalgh review distinguish diffusion from dissemination and implementation?",
        [
            ("Diffusion is planned and the others are passive", False),
            ("Diffusion is passive, unplanned spread; dissemination and implementation are active, planned efforts", True),
            ("They are three words for the same thing", False),
            ("Diffusion applies to drugs only", False),
        ],
        "The review separates passive diffusion from the active, planned efforts of dissemination and implementation, a distinction that matters when planning how a program will spread."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] " + BOOK12 + " — §12.8 Implications for You (Vermont hospital executives); §12.2 The Knowledge and Implementation Infrastructure"),
    blk('src2', "[2] Greenhalgh T, Robert G, Macfarlane F, Bate P, Kyriakidou O. Diffusion of innovations in service organizations: systematic review and recommendations. Milbank Quarterly 82(4):581-629 (2004) — https://pmc.ncbi.nlm.nih.gov/articles/PMC2690184/ — abstract and summaries; full text not read"),
    blk('src3', "[3] Rogers EM, Diffusion of Innovations (attributes of innovations and adopter categories), as cited in the diffusion literature; see the Milbank review above"),
    blk('src4', "[4] Vermont Rural Health Transformation Program — https://www.ruralhealthinfo.org/states/vermont/rhtp ; Vermont Joint Fiscal Committee presentation, Rural Health Transformation, February 2026 — https://ljfo.vermont.gov/assets/Meetings/Joint-Fiscal-Committee/2026-02-06/0fa93d140d/JFC-RHT-20260205.pdf — shared services initiative category"),
]

LESSONS = [(L8_SLUG, L8_TITLE, L8, 8), (L9_SLUG, L9_TITLE, L9, 9), (L10_SLUG, L10_TITLE, L10, 10)]
if __name__ == '__main__':
    run(LESSONS)
