#!/usr/bin/env python3
import json

course = {
  "id": "course_interoperability",
  "slug": "interoperability-data-exchange",
  "title": "Healthcare Interoperability & Data Exchange",
  "subtitle": "HL7 FHIR, 21st Century Cures Act, patient access APIs, and real-world HIE implementation",
  "description": "Master the standards, regulations, and systems that enable health data to flow securely across providers, payers, and patients. From HL7 FHIR to the 21st Century Cures Act, information blocking rules, patient access APIs, and real-world HIE implementation.",
  "targetAudience": ["Health IT professionals","Hospital CIOs and CTOs","EHR analysts","Policy staff","Interoperability engineers","Care coordinators"],
  "prerequisites": [],
  "estimatedHours": 9,
  "isPublished": True,
  "version": "1.0.0",
  "createdAt": "2026-05-26T00:00:00Z",
  "updatedAt": "2026-05-26T00:00:00Z",
  "tracks": [
    {
      "id": "track_interop_foundations",
      "courseId": "course_interoperability",
      "pillar": "technology",
      "order": 1,
      "slug": "interop-foundations",
      "title": "Foundations of Interoperability",
      "description": "Why health data doesn't flow freely — semantic, syntactic, and organizational barriers — and the foundational standards designed to fix them.",
      "isPublished": True,
      "createdAt": "2026-05-26T00:00:00Z",
      "updatedAt": "2026-05-26T00:00:00Z",
      "lessons": [
        {
          "id": "lesson_interop_why",
          "trackId": "track_interop_foundations",
          "pillar": "technology",
          "order": 1,
          "slug": "why-interoperability-matters",
          "title": "Why Interoperability Matters: The $8.3 Billion Problem",
          "summary": "The cost of fragmented health data — duplicate tests, medication errors, care delays — and the three types of interoperability that define the solution.",
          "estimatedMinutes": 20,
          "isPublished": True,
          "tags": ["interoperability","health IT","data exchange","fragmentation"],
          "relatedLessonIds": [],
          "createdAt": "2026-05-26T00:00:00Z",
          "updatedAt": "2026-05-26T00:00:00Z",
          "objectives": [
            {"id": "obj_iw1", "text": "Define the three types of interoperability: foundational, structural, and semantic"},
            {"id": "obj_iw2", "text": "Explain the financial and clinical cost of health data fragmentation"},
            {"id": "obj_iw3", "text": "Describe the organizational and cultural barriers beyond technical standards"}
          ],
          "contentBlocks": [
            {
              "type": "text",
              "heading": "The $8.3 billion fragmentation tax",
              "body": "Every year, the US healthcare system wastes an estimated $8.3 billion because patient data cannot follow patients. That figure — from the Council for Affordable Quality Healthcare (CAQH) — captures only the administrative side: duplicate claim submissions, redundant prior authorizations, phone calls between offices trying to locate records. The clinical cost is harder to quantify but almost certainly larger. Duplicate imaging studies, repeated lab draws, medication errors from incomplete histories, delayed diagnoses because records arrived too late — these are the invisible toll of a system built in silos.\n\nThe irony is that the US healthcare system generates more data than any other in the world. A single hospitalization can produce tens of thousands of data points. EHRs hold decades of clinical history. Wearable devices stream real-time biometrics. The problem is not data scarcity — it is data imprisoned in incompatible systems, behind proprietary walls, with no agreed pathway to move.\n\nInteroperability is the solution. But it is not a single technology or a single standard — it is a property of a system that allows data to be exchanged, integrated, and used by authorized parties. Achieving it requires alignment across technical standards, semantic vocabulary, legal frameworks, organizational workflows, and business incentives. Most interoperability failures are not technical. They are organizational or economic."
            },
            {
              "type": "concepts_grid",
              "heading": "Three types of interoperability",
              "items": [
                {"term": "Foundational", "definition": "The ability to establish secure data transport between systems — data can be sent and received, even if not interpreted. Like being able to mail a letter to any address."},
                {"term": "Structural", "definition": "Data is organized in a standardized format that receiving systems can parse — like HL7 or FHIR. The envelope and letter structure are agreed upon."},
                {"term": "Semantic", "definition": "The meaning of data is understood consistently across systems. The same clinical concept — 'type 2 diabetes' — is represented with the same code everywhere. The hardest level to achieve."}
              ]
            },
            {
              "type": "key_stat",
              "value": "50%",
              "label": "of US patients have experienced duplicate testing",
              "context": "Half of American patients report having a test or procedure repeated because a prior result was unavailable at the point of care (CAQH 2022). Each duplicate imaging study costs $500–$3,000 and carries radiation exposure."
            },
            {
              "type": "callout",
              "variant": "warning",
              "title": "Vendor networks are not interoperability",
              "body": "Epic's Care Everywhere connects 250 million patient records — but only within the Epic network. A patient moving from an Epic hospital to a MEDITECH critical access hospital may still face record fragmentation. True interoperability means data flows regardless of vendor. National frameworks like CommonWell, Carequality, and eHealth Exchange attempt to bridge vendor silos, but adoption and data quality remain inconsistent."
            },
            {
              "type": "glossary_terms",
              "terms": [
                {"term": "Interoperability", "definition": "The ability of different information systems, devices, or applications to connect, exchange data, and use the shared data."},
                {"term": "Health data exchange", "definition": "The electronic movement of health-related information among organizations according to nationally recognized standards."},
                {"term": "Semantic interoperability", "definition": "The ability for shared information to be understood at the level of defined domain concepts — the same meaning is preserved across systems."},
                {"term": "EHR fragmentation", "definition": "The condition in which a patient's health records are distributed across multiple incompatible systems, preventing a unified view of their care history."}
              ]
            }
          ],
          "quiz": {
            "id": "quiz_interop_why",
            "lessonId": "lesson_interop_why",
            "passingScore": 75,
            "questions": [
              {
                "id": "q_iw1",
                "prompt": "Which level of interoperability ensures that the MEANING of clinical data — not just its format — is preserved across systems?",
                "type": "single_choice",
                "options": [
                  {"id": "q_iw1a", "text": "Foundational interoperability", "isCorrect": False, "explanation": "Foundational interoperability only ensures data can be transported between systems — it does not address whether the receiving system can interpret the meaning."},
                  {"id": "q_iw1b", "text": "Structural interoperability", "isCorrect": False, "explanation": "Structural interoperability ensures data is in a parseable format (like HL7 or FHIR) but does not guarantee that clinical concepts mean the same thing across systems."},
                  {"id": "q_iw1c", "text": "Semantic interoperability", "isCorrect": True, "explanation": "Semantic interoperability is the highest level — it ensures clinical concepts carry the same meaning across different systems, enabling true data integration rather than just data transport."},
                  {"id": "q_iw1d", "text": "Organizational interoperability", "isCorrect": False, "explanation": "Organizational interoperability refers to governance and policy alignment between institutions, not the technical preservation of data meaning."}
                ],
                "explanation": "The three levels of interoperability progress from foundational (can we transport data?) to structural (is it in a standard format?) to semantic (do we agree on what it means?). Semantic is the hardest and most valuable."
              },
              {
                "id": "q_iw2",
                "prompt": "CAQH estimates that lack of interoperability costs the US healthcare system approximately how much per year in administrative waste alone?",
                "type": "single_choice",
                "options": [
                  {"id": "q_iw2a", "text": "$1.2 billion", "isCorrect": False, "explanation": "This significantly underestimates the CAQH finding. The actual figure reflects the enormous volume of redundant administrative transactions across the entire healthcare system."},
                  {"id": "q_iw2b", "text": "$8.3 billion", "isCorrect": True, "explanation": "CAQH's annual Index Report estimates $8.3 billion in administrative waste attributable to lack of interoperability — covering duplicate auths, redundant claim submissions, and manual phone-based record requests."},
                  {"id": "q_iw2c", "text": "$23 billion", "isCorrect": False, "explanation": "While total healthcare administrative waste is estimated at $265 billion (JAMA 2019), the specific interoperability-attributable administrative waste figure from CAQH is $8.3 billion."},
                  {"id": "q_iw2d", "text": "$500 million", "isCorrect": False, "explanation": "This figure is far too low. Even a single large hospital system can spend tens of millions annually on manual record retrieval and duplicate testing attributable to poor interoperability."}
                ],
                "explanation": "CAQH's annual report on the cost of administrative complexity in healthcare identifies $8.3 billion in waste attributable to interoperability failures — and this captures only the administrative side, not clinical redundancy."
              },
              {
                "id": "q_iw3",
                "prompt": "A hospital successfully sends a lab result message to a specialist's EHR, but the receiving system cannot interpret the LOINC code used for the test. Which level of interoperability has failed?",
                "type": "single_choice",
                "options": [
                  {"id": "q_iw3a", "text": "Foundational", "isCorrect": False, "explanation": "Foundational interoperability succeeded — the data was transported between systems. The failure occurred at a higher level."},
                  {"id": "q_iw3b", "text": "Structural", "isCorrect": False, "explanation": "Structural interoperability likely succeeded if the message was in a recognized format like HL7. The problem is that the specific code used was not understood."},
                  {"id": "q_iw3c", "text": "Semantic", "isCorrect": True, "explanation": "Semantic interoperability failed. The data arrived and was structurally valid, but the receiving system could not interpret the LOINC code — meaning the clinical concept was not understood. This is the most common real-world interoperability failure."},
                  {"id": "q_iw3d", "text": "All three levels failed", "isCorrect": False, "explanation": "Foundational and structural levels worked — the data moved and arrived in a parseable format. Only semantic interoperability failed because the code's meaning was not recognized."}
                ],
                "explanation": "When data arrives but its meaning cannot be interpreted — because of unrecognized codes, local terminology, or mapping gaps — semantic interoperability has failed. This is extremely common in real health IT environments."
              },
              {
                "id": "q_iw4",
                "prompt": "Which of the following is the MOST COMMON root cause of interoperability failures in US healthcare?",
                "type": "single_choice",
                "options": [
                  {"id": "q_iw4a", "text": "Lack of technical standards", "isCorrect": False, "explanation": "Technical standards exist — HL7 v2, FHIR, C-CDA, DICOM, and others cover most healthcare data types. The problem is not a lack of standards but a lack of adoption and alignment."},
                  {"id": "q_iw4b", "text": "Organizational and economic barriers", "isCorrect": True, "explanation": "Most interoperability experts agree that organizational and economic barriers — vendor lock-in strategies, information blocking, misaligned financial incentives, governance gaps — are the primary obstacles. The technical standards largely exist."},
                  {"id": "q_iw4c", "text": "Insufficient computing power", "isCorrect": False, "explanation": "Computing power is not a constraint. Modern cloud infrastructure can handle healthcare data exchange at any scale."},
                  {"id": "q_iw4d", "text": "HIPAA privacy restrictions", "isCorrect": False, "explanation": "HIPAA is frequently cited as a barrier but is actually permissive of treatment-related data exchange. Most HIPAA-based refusals to share data are misapplications of the law, not legitimate restrictions."}
                ],
                "explanation": "The 21st Century Cures Act's information blocking provisions implicitly acknowledge this — the law's primary target is the organizational and economic practice of deliberately impeding data flow, not technical inadequacy."
              }
            ]
          }
        },
        {
          "id": "lesson_hl7v2",
          "trackId": "track_interop_foundations",
          "pillar": "technology",
          "order": 2,
          "slug": "hl7-v2-legacy-messaging",
          "title": "HL7 v2: The Lingua Franca of Hospital Systems",
          "summary": "HL7 v2 has carried hospital messages since 1987 and still dominates clinical data exchange — understanding its structure, message types, and limitations is essential for any health IT professional.",
          "estimatedMinutes": 18,
          "isPublished": True,
          "tags": ["HL7","v2","messaging","ADT","ORU","interoperability"],
          "relatedLessonIds": ["lesson_fhir_intro"],
          "createdAt": "2026-05-26T00:00:00Z",
          "updatedAt": "2026-05-26T00:00:00Z",
          "objectives": [
            {"id": "obj_v2_1", "text": "Describe the structure of an HL7 v2 message including segments and fields"},
            {"id": "obj_v2_2", "text": "Identify the most common HL7 v2 message types and their clinical triggers"},
            {"id": "obj_v2_3", "text": "Explain the core limitation of HL7 v2 that makes semantic interoperability difficult"}
          ],
          "contentBlocks": [
            {
              "type": "text",
              "heading": "The standard that conquered healthcare — by accident",
              "body": "HL7 version 2 was developed in 1987 by a small group of health IT pioneers who met at a hotel in Philadelphia. Their goal was modest: create a standard for exchanging data between hospital laboratory systems and clinical systems. What they produced became the most widely implemented healthcare data standard in history — carrying an estimated 95% of all clinical data transactions in US hospitals to this day.\n\nThe staying power of HL7 v2 is remarkable given that it was designed before the internet, before relational databases became ubiquitous, and before anyone imagined the complexity of modern EHR systems. The standard uses a pipe-delimited text format that looks almost primitive by modern standards. Yet every hospital in the country processes thousands of HL7 v2 messages per day. Understanding this format is not optional for health IT professionals — it is the baseline.\n\nThe fundamental structure of HL7 v2 is the message. Each message has a type (determined by its first segment), and each message is made of segments separated by carriage returns. Segments are made of fields separated by pipe characters (|). Within fields, components are separated by carets (^), and sub-components by ampersands (&). A typical ADT^A01 admission message might contain 15–25 segments covering patient demographics, visit information, attending physician, diagnosis, and insurance."
            },
            {
              "type": "comparison_table",
              "heading": "Key HL7 v2 message types",
              "headers": ["Message Type", "Trigger Event", "Clinical Use", "Key Segments"],
              "rows": [
                ["ADT^A01", "Patient admitted", "Inpatient admission notification to downstream systems", "MSH, EVN, PID, PV1"],
                ["ADT^A08", "Patient info updated", "Demographics update, insurance change", "MSH, EVN, PID, PV1"],
                ["ADT^A03", "Patient discharged", "Discharge notification, billing trigger", "MSH, EVN, PID, PV1, DG1"],
                ["ORU^R01", "Observation result", "Lab results from LIS to EHR or ordering system", "MSH, PID, OBR, OBX"],
                ["ORM^O01", "Order message", "Lab or radiology order from EHR to ancillary system", "MSH, PID, ORC, OBR"],
                ["SIU^S12", "Schedule notification", "Appointment scheduled, modified, or cancelled", "MSH, SCH, PID, RGS, AIS"]
              ]
            },
            {
              "type": "callout",
              "variant": "warning",
              "title": "The standard that isn't standard",
              "body": "HL7 v2's greatest weakness is also what made it popular: flexibility. The standard defines required and optional fields, but allows extensive local customization through 'Z-segments' — custom segments with no national definition. Every major EHR vendor has implemented HL7 v2 slightly differently. A Cerner ADT feed and an Epic ADT feed can carry the same data in different fields, with different coding conventions, and with different optional segments populated. This is why interface engines exist: to translate between each organization's HL7 v2 dialect. A large hospital system may have 300+ active HL7 interfaces, each requiring ongoing maintenance."
            },
            {
              "type": "key_stat",
              "value": "95%",
              "label": "of US hospital data transactions use HL7 v2",
              "context": "Despite being developed in 1987, HL7 v2 remains the dominant standard for internal hospital data exchange. It is expected to coexist with FHIR for at least another decade as the installed base of v2 interfaces is enormous."
            },
            {
              "type": "callout",
              "variant": "example",
              "title": "Real-world HL7 v2 failure: medication errors from interface mismatches",
              "body": "A hospital integrated a new pharmacy system with their EHR via HL7 v2. The pharmacy system sent RxNorm codes for medications in a Z-segment field. The EHR expected drug codes in the standard CE data type field within OBX. Because the interface was not correctly mapped, medications arrived as free text strings with no structured code. Pharmacists could not perform automated drug interaction checks. The error went undetected for 6 months because the data 'looked right' on screen. This pattern — data present but semantically broken — is among the most dangerous in health IT."
            }
          ],
          "quiz": {
            "id": "quiz_hl7v2",
            "lessonId": "lesson_hl7v2",
            "passingScore": 75,
            "questions": [
              {
                "id": "q_v2_1",
                "prompt": "Which HL7 v2 message type is triggered when a patient is admitted to an inpatient unit?",
                "type": "single_choice",
                "options": [
                  {"id": "q_v2_1a", "text": "ORU^R01", "isCorrect": False, "explanation": "ORU^R01 is an observation result message — used to send lab results from a laboratory system to a clinical system. It is not triggered by patient admission."},
                  {"id": "q_v2_1b", "text": "ADT^A01", "isCorrect": True, "explanation": "ADT^A01 is the Admit/Visit Notification message — it fires when a patient is admitted to an inpatient unit. It carries patient demographics, visit information, attending physician, and insurance data to downstream systems."},
                  {"id": "q_v2_1c", "text": "ORM^O01", "isCorrect": False, "explanation": "ORM^O01 is an order message — used to send lab or radiology orders from an EHR to an ancillary system. It is not triggered by admission."},
                  {"id": "q_v2_1d", "text": "ADT^A03", "isCorrect": False, "explanation": "ADT^A03 is the discharge message — triggered when a patient is discharged, not admitted. The A01 and A03 pair are the bookends of an inpatient stay."}
                ],
                "explanation": "ADT messages (Admission/Discharge/Transfer) are the most foundational in hospital data exchange. A01 = admit, A02 = transfer, A03 = discharge, A08 = update patient information."
              },
              {
                "id": "q_v2_2",
                "prompt": "What is a Z-segment in HL7 v2, and why is it a source of interoperability problems?",
                "type": "single_choice",
                "options": [
                  {"id": "q_v2_2a", "text": "A segment that carries encrypted data requiring a decryption key", "isCorrect": False, "explanation": "Z-segments have nothing to do with encryption. They are custom extension segments, not security mechanisms."},
                  {"id": "q_v2_2b", "text": "A custom segment added by a vendor or organization with no national standard definition", "isCorrect": True, "explanation": "Z-segments are locally defined extensions to the HL7 v2 standard. Because they have no national definition, every organization implements them differently, making automated cross-system interpretation impossible without custom mapping."},
                  {"id": "q_v2_2c", "text": "The last segment in every HL7 message that signals end of transmission", "isCorrect": False, "explanation": "The end of an HL7 v2 message is signaled by the MSH segment of the next message or the end of the data stream. There is no universal 'Z' terminal segment."},
                  {"id": "q_v2_2d", "text": "A required segment that carries patient safety information", "isCorrect": False, "explanation": "Z-segments are optional, locally defined, and not standardized. They are the opposite of required — they represent the non-standard extensions that make HL7 v2 difficult to implement across organizations."}
                ],
                "explanation": "Z-segments represent the 'escape valve' in HL7 v2 that allowed rapid adoption but undermined standardization. Most large EHR vendors use Z-segments extensively, requiring custom interface development for each connection."
              },
              {
                "id": "q_v2_3",
                "prompt": "A laboratory system sends an ORU^R01 message to an EHR with a patient's blood glucose result. Which segment in that message would contain the actual numeric glucose value?",
                "type": "single_choice",
                "options": [
                  {"id": "q_v2_3a", "text": "MSH (Message Header)", "isCorrect": False, "explanation": "The MSH segment contains message control information: sending/receiving application, message type, message ID, timestamp. Clinical results are not in the MSH."},
                  {"id": "q_v2_3b", "text": "PID (Patient Identification)", "isCorrect": False, "explanation": "The PID segment carries patient demographics: name, date of birth, medical record number, address. The actual lab value is not here."},
                  {"id": "q_v2_3c", "text": "OBR (Observation Request)", "isCorrect": False, "explanation": "The OBR segment identifies the order that produced the results — the test ordered, the ordering provider, the collection time. The numeric value is in a different segment."},
                  {"id": "q_v2_3d", "text": "OBX (Observation/Result)", "isCorrect": True, "explanation": "OBX (Observation/Result) segments carry the actual clinical values. Each OBX contains one result: the LOINC code identifying the test, the value, the units, the reference range, and the abnormal flag. A single ORU message may contain many OBX segments for a panel."}
                ],
                "explanation": "The OBX segment is the workhorse of clinical results in HL7 v2. Understanding MSH → PID → OBR → OBX is foundational to reading any lab result message."
              },
              {
                "id": "q_v2_4",
                "prompt": "Why does HL7 v2 remain dominant in US hospitals despite being developed in 1987?",
                "type": "single_choice",
                "options": [
                  {"id": "q_v2_4a", "text": "It is technically superior to FHIR for clinical data exchange", "isCorrect": False, "explanation": "HL7 v2 is not technically superior to FHIR — it lacks RESTful APIs, JSON/XML support, and modern developer tooling. Its dominance is due to installed base, not technical merit."},
                  {"id": "q_v2_4b", "text": "Federal law requires hospitals to use HL7 v2", "isCorrect": False, "explanation": "Federal law does not mandate HL7 v2. CMS and ONC regulations increasingly mandate FHIR R4, not v2. HL7 v2 dominance is a market reality, not a legal requirement."},
                  {"id": "q_v2_4c", "text": "The enormous installed base of v2 interfaces makes replacement prohibitively expensive and risky", "isCorrect": True, "explanation": "A large hospital system may have 300–500 active HL7 v2 interfaces. Replacing them all with FHIR equivalents would cost tens of millions of dollars and risk disrupting clinical operations. This installed base inertia keeps v2 dominant even as FHIR grows."},
                  {"id": "q_v2_4d", "text": "FHIR has not yet been adopted by any major EHR vendor", "isCorrect": False, "explanation": "All major EHR vendors — Epic, Oracle/Cerner, MEDITECH, athenahealth — have implemented FHIR R4 APIs. FHIR adoption is growing rapidly, particularly for patient-facing applications. The issue is that it hasn't yet replaced v2 for internal hospital messaging."}
                ],
                "explanation": "Technology transitions in healthcare are driven more by economics than by technical merit. The installed base of HL7 v2 interfaces represents a massive sunk cost that organizations are reluctant to replace all at once."
              }
            ]
          }
        },
        {
          "id": "lesson_fhir_intro",
          "trackId": "track_interop_foundations",
          "pillar": "technology",
          "order": 3,
          "slug": "hl7-fhir-introduction",
          "title": "HL7 FHIR: Healthcare's RESTful Future",
          "summary": "FHIR (Fast Healthcare Interoperability Resources) is the modern standard enabling API-based health data exchange — understand its resources, REST interactions, profiles, and why R4 is the regulatory baseline.",
          "estimatedMinutes": 22,
          "isPublished": True,
          "tags": ["FHIR","HL7","REST","API","interoperability","R4"],
          "relatedLessonIds": ["lesson_hl7v2","lesson_smart_fhir"],
          "createdAt": "2026-05-26T00:00:00Z",
          "updatedAt": "2026-05-26T00:00:00Z",
          "objectives": [
            {"id": "obj_fhir1", "text": "Explain what a FHIR resource is and list five core clinical resources"},
            {"id": "obj_fhir2", "text": "Describe the four basic FHIR REST interactions: read, search, create, update"},
            {"id": "obj_fhir3", "text": "Explain why FHIR R4 is the version required by US federal regulations"}
          ],
          "contentBlocks": [
            {
              "type": "text",
              "heading": "A fresh look at health data exchange",
              "body": "In 2011, a New Zealand health informaticist named Grahame Grieve published a proposal called 'Fresh Look at Healthcare Interoperability.' He argued that healthcare data exchange standards had become too complex, too slow to implement, and too far removed from modern software development practices. His solution was elegant: model clinical data as discrete, web-native resources that could be exchanged using the same RESTful API patterns that power the modern internet.\n\nThe result was FHIR — Fast Healthcare Interoperability Resources — now published and maintained by HL7 International. Where HL7 v2 uses pipe-delimited text messages and HL7 v3 used dense XML schemas that required specialized tooling, FHIR uses JSON or XML in a format familiar to any web developer. A FHIR Patient resource looks like the JSON objects used by thousands of modern APIs. This was intentional: by lowering the barrier to entry, FHIR attracted a generation of software developers who had never built health IT systems before.\n\nFHIR's core architectural decision is the 'resource.' A resource is a discrete, identifiable unit of healthcare information — a Patient, an Observation (lab result or vital sign), a MedicationRequest, a Condition, an Encounter. There are 145+ FHIR resources covering virtually every domain of clinical and administrative healthcare. Each resource has a defined set of elements, a canonical URL, and can be retrieved, created, updated, or searched via standard HTTP methods. This RESTful design means FHIR APIs work with standard HTTP clients, including curl, Postman, or any programming language's HTTP library."
            },
            {
              "type": "concepts_grid",
              "heading": "Core FHIR resources",
              "items": [
                {"term": "Patient", "definition": "Demographics and administrative information about a person receiving healthcare — name, DOB, address, identifiers, contact information."},
                {"term": "Observation", "definition": "Measurements and simple assertions made about a patient — lab results, vital signs, social history responses, SDOH screening answers."},
                {"term": "MedicationRequest", "definition": "An order or request for supply and administration of a medication — the FHIR equivalent of a prescription."},
                {"term": "Condition", "definition": "A clinical condition, problem, diagnosis, or other event that has bearing on the patient's health — the problem list."},
                {"term": "Encounter", "definition": "An interaction between a patient and healthcare provider — an office visit, ED encounter, inpatient stay, or telehealth session."},
                {"term": "DiagnosticReport", "definition": "The findings and interpretation of diagnostic tests — combines the order (ServiceRequest), results (Observations), and narrative interpretation."}
              ]
            },
            {
              "type": "timeline",
              "heading": "FHIR development milestones",
              "events": [
                {"year": "2011", "label": "FHIR proposed", "description": "Grahame Grieve publishes 'Fresh Look at Healthcare Interoperability.' HL7 begins FHIR development."},
                {"year": "2014", "label": "DSTU1 published", "description": "First Draft Standard for Trial Use (DSTU1) released. Early implementers begin building SMART on FHIR apps."},
                {"year": "2017", "label": "STU3 published", "description": "FHIR STU3 becomes the first version widely implemented in EHR products. Apple Health Records uses STU3."},
                {"year": "2019", "label": "R4 published", "description": "FHIR R4 published as the first 'normative' version — meaning core resources are stable and won't change in breaking ways."},
                {"year": "2020", "label": "Federal mandate", "description": "ONC and CMS finalize rules requiring FHIR R4 APIs for certified EHRs and CMS-regulated payers."},
                {"year": "2023", "label": "R4B and R5", "description": "FHIR R4B (minor update) and R5 (major update) published, but R4 remains the regulatory and implementation baseline."}
              ]
            },
            {
              "type": "key_stat",
              "value": "1B+",
              "label": "FHIR API calls per month across US health systems",
              "context": "As of 2024, FHIR APIs at major US health systems process over 1 billion API calls per month, driven by patient-facing apps, payer integrations, and population health analytics tools."
            },
            {
              "type": "callout",
              "variant": "info",
              "title": "Why R4, not R5?",
              "body": "FHIR R5 was published in 2023 with significant improvements, but ONC's certification rules and CMS's interoperability rules both specify FHIR R4 as the required version. Implementation guides like US Core, CARIN Blue Button, and Da Vinci are all built on R4. Health IT vendors will not migrate to R5 until regulatory and implementation guide support catches up — a process that typically takes 3–5 years. R4 is the version that matters for US healthcare today."
            }
          ],
          "quiz": {
            "id": "quiz_fhir_intro",
            "lessonId": "lesson_fhir_intro",
            "passingScore": 75,
            "questions": [
              {
                "id": "q_fhir1",
                "prompt": "Which FHIR resource would contain a patient's blood pressure reading taken during an office visit?",
                "type": "single_choice",
                "options": [
                  {"id": "q_fhir1a", "text": "Patient", "isCorrect": False, "explanation": "The Patient resource contains demographic and administrative information — name, date of birth, address, identifiers. Clinical measurements are stored elsewhere."},
                  {"id": "q_fhir1b", "text": "Observation", "isCorrect": True, "explanation": "The Observation resource is used for measurements and assertions — vital signs (including blood pressure), lab results, SDOH screening responses. A blood pressure reading would be an Observation with a LOINC code for blood pressure and component values for systolic and diastolic."},
                  {"id": "q_fhir1c", "text": "Condition", "isCorrect": False, "explanation": "Condition represents diagnoses and clinical problems — 'hypertension' would be a Condition, but the actual blood pressure measurement taken during the visit is an Observation."},
                  {"id": "q_fhir1d", "text": "Encounter", "isCorrect": False, "explanation": "Encounter represents the visit itself — the time, location, provider, and reason for the appointment. The specific blood pressure reading taken during that encounter is an Observation linked to the Encounter."}
                ],
                "explanation": "Observation is FHIR's workhorse resource for clinical measurements. It covers vital signs, laboratory results, imaging results, social history, and SDOH screening — anything that is measured, observed, or asserted about a patient."
              },
              {
                "id": "q_fhir2",
                "prompt": "FHIR is described as 'RESTful.' What does this mean in practical terms for a health IT application?",
                "type": "single_choice",
                "options": [
                  {"id": "q_fhir2a", "text": "The application can only retrieve data, not send or modify it", "isCorrect": False, "explanation": "REST supports the full range of operations — GET (read), POST (create), PUT (update), DELETE (remove). 'RESTful' does not mean read-only."},
                  {"id": "q_fhir2b", "text": "The application uses standard HTTP methods to interact with FHIR resources via URLs", "isCorrect": True, "explanation": "RESTful means the API follows REST architectural principles: resources are identified by URLs, interactions use standard HTTP methods (GET, POST, PUT, DELETE), and responses are in standard formats (JSON or XML). Any developer who has used a modern web API can work with FHIR."},
                  {"id": "q_fhir2c", "text": "The application requires a special HL7 SDK to connect", "isCorrect": False, "explanation": "One of FHIR's key advantages over earlier HL7 standards is that it does NOT require specialized SDKs. Standard HTTP libraries in any programming language can interact with a FHIR server."},
                  {"id": "q_fhir2d", "text": "The application must be certified by HL7 before accessing FHIR data", "isCorrect": False, "explanation": "There is no HL7 certification required to access FHIR APIs. Authorization is handled by the server through OAuth 2.0 and SMART on FHIR — not through HL7 certification."}
                ],
                "explanation": "FHIR's RESTful design is one of its most important innovations. By aligning with web standards, it made health data exchange accessible to the broader software development community, not just specialized health IT vendors."
              },
              {
                "id": "q_fhir3",
                "prompt": "Which FHIR version is required by ONC and CMS federal regulations for certified EHR technology and payer APIs?",
                "type": "single_choice",
                "options": [
                  {"id": "q_fhir3a", "text": "FHIR DSTU2", "isCorrect": False, "explanation": "DSTU2 was an early draft version from 2014 and is not the regulatory standard. It is still used by some legacy integrations but has been superseded."},
                  {"id": "q_fhir3b", "text": "FHIR STU3", "isCorrect": False, "explanation": "STU3 was widely implemented between 2017 and 2019 and is still found in some systems, but ONC and CMS regulations specify R4, not STU3."},
                  {"id": "q_fhir3c", "text": "FHIR R4", "isCorrect": True, "explanation": "ONC's 21st Century Cures Act Final Rule and CMS's Interoperability and Patient Access Final Rule both specify FHIR R4 as the required version for certified EHR APIs and payer APIs. R4 is the first 'normative' version of FHIR."},
                  {"id": "q_fhir3d", "text": "FHIR R5", "isCorrect": False, "explanation": "FHIR R5 was published in 2023 and has important improvements, but it is not yet the federally required version. US implementation guides and regulatory frameworks are built on R4."}
                ],
                "explanation": "FHIR R4 is the regulatory baseline for US healthcare interoperability. All major US Core profiles, Da Vinci implementation guides, and CMS API requirements are built on FHIR R4."
              },
              {
                "id": "q_fhir4",
                "prompt": "A developer wants to retrieve the medication list for a specific patient from a FHIR server. Which HTTP method would they use?",
                "type": "single_choice",
                "options": [
                  {"id": "q_fhir4a", "text": "POST", "isCorrect": False, "explanation": "POST is used to CREATE a new resource on the FHIR server. It is also used for search operations that require a request body. Retrieving an existing resource uses a different method."},
                  {"id": "q_fhir4b", "text": "PUT", "isCorrect": False, "explanation": "PUT is used to UPDATE an existing resource — replacing it with the provided content. It is not used to retrieve data."},
                  {"id": "q_fhir4c", "text": "GET", "isCorrect": True, "explanation": "GET is the HTTP method for reading/retrieving resources. To get a patient's medications, the developer would send a GET request to [base]/MedicationRequest?patient=[id]. The FHIR server returns matching MedicationRequest resources in a Bundle."},
                  {"id": "q_fhir4d", "text": "DELETE", "isCorrect": False, "explanation": "DELETE removes a resource from the server. Never use DELETE to retrieve data."}
                ],
                "explanation": "FHIR uses standard HTTP methods: GET (read/search), POST (create or search with body), PUT (update), and DELETE (remove). GET is the most common operation for clinical applications retrieving patient data."
              }
            ]
          }
        },
        {
          "id": "lesson_cda_ccda",
          "trackId": "track_interop_foundations",
          "pillar": "technology",
          "order": 4,
          "slug": "cda-ccda-clinical-documents",
          "title": "CDA & C-CDA: Clinical Documents in Motion",
          "summary": "Clinical Document Architecture and Consolidated CDA templates define how clinical documents like care summaries and discharge notes are structured — understanding C-CDA is essential for transitions of care.",
          "estimatedMinutes": 16,
          "isPublished": True,
          "tags": ["CDA","C-CDA","clinical documents","Meaningful Use","transitions of care"],
          "relatedLessonIds": ["lesson_fhir_intro"],
          "createdAt": "2026-05-26T00:00:00Z",
          "updatedAt": "2026-05-26T00:00:00Z",
          "objectives": [
            {"id": "obj_cda1", "text": "Describe the purpose of CDA and C-CDA in health information exchange"},
            {"id": "obj_cda2", "text": "Identify the most common C-CDA document templates and when each is used"},
            {"id": "obj_cda3", "text": "Explain the key limitation of C-CDA compared to FHIR for data exchange"}
          ],
          "contentBlocks": [
            {
              "type": "text",
              "heading": "Clinical documents as the unit of exchange",
              "body": "Before FHIR made discrete data exchange practical, the primary mechanism for sharing clinical information between organizations was the clinical document. The Clinical Document Architecture (CDA), released by HL7 in 2000, provided an XML-based standard for structuring these documents so that receiving systems could at least parse their sections, even if they could not always extract individual data elements.\n\nThe Consolidated CDA (C-CDA) brought order to a proliferating set of CDA templates. Published by HL7 in 2011 and required under Meaningful Use, C-CDA defined specific document types with specific section requirements. The Continuity of Care Document (CCD) became the most widely implemented — a patient summary intended to support care transitions by packaging current problems, medications, allergies, immunizations, vital signs, and lab results in a single XML document.\n\nC-CDA remains central to US health information exchange because it is deeply embedded in certified EHR technology requirements. When a patient transitions from a hospital to a skilled nursing facility, a C-CDA discharge summary is the standard mechanism. When a patient requests their records through a patient portal, they often receive a C-CDA. Despite FHIR's growing prominence, C-CDA is not going away — the challenge is that its quality is highly variable."
            },
            {
              "type": "comparison_table",
              "heading": "Common C-CDA document templates",
              "headers": ["Template", "Use Case", "Key Required Sections"],
              "rows": [
                ["Continuity of Care Document (CCD)", "Transitions of care, patient summaries", "Problems, medications, allergies, immunizations, vital signs, results"],
                ["Discharge Summary", "Hospital-to-post-acute transitions", "Discharge diagnosis, discharge condition, discharge medications, follow-up plan"],
                ["Progress Note", "Ongoing outpatient care documentation", "Assessment, plan, subjective/objective findings"],
                ["Referral Note", "Specialist referrals", "Reason for referral, relevant history, current medications"],
                ["Operative Note", "Surgical procedure documentation", "Pre/post-operative diagnosis, procedure, findings, specimens"],
                ["History & Physical", "New patient assessments", "Chief complaint, history of present illness, review of systems, physical exam"]
              ]
            },
            {
              "type": "callout",
              "variant": "warning",
              "title": "The C-CDA quality problem",
              "body": "C-CDA quality varies dramatically across EHR implementations. A study published in the Journal of the American Medical Informatics Association found that 60% of C-CDAs received at a large academic medical center had at least one data quality issue — medications listed as allergies, problem lists duplicated across sections, immunization dates missing. The standard defines structure but cannot enforce data quality. Receiving systems must build extensive validation and cleanup logic, and clinicians often cannot trust the structured data, defaulting to reading the narrative text instead."
            },
            {
              "type": "callout",
              "variant": "info",
              "title": "C-CDA vs. FHIR Documents: choosing the right approach",
              "body": "FHIR supports document exchange through its Document resource profile — essentially packaging FHIR resources into a structured document analogous to C-CDA. For new implementations, FHIR-based documents offer better tooling and developer experience. However, C-CDA remains required for Meaningful Use attestation, most HIE networks, and transition of care workflows. In practice, health systems must support both formats for the foreseeable future."
            }
          ],
          "quiz": {
            "id": "quiz_cda",
            "lessonId": "lesson_cda_ccda",
            "passingScore": 75,
            "questions": [
              {
                "id": "q_cda1",
                "prompt": "Which C-CDA document template is most commonly used for transitions of care — such as when a patient is discharged from the hospital?",
                "type": "single_choice",
                "options": [
                  {"id": "q_cda1a", "text": "Progress Note", "isCorrect": False, "explanation": "Progress Notes document ongoing outpatient visits — they are not transition-of-care documents."},
                  {"id": "q_cda1b", "text": "Continuity of Care Document (CCD)", "isCorrect": False, "explanation": "The CCD is used for general care summaries and care transitions, but hospital-to-post-acute discharges specifically use the Discharge Summary template."},
                  {"id": "q_cda1c", "text": "Discharge Summary", "isCorrect": True, "explanation": "The Discharge Summary C-CDA template is specifically designed for hospital discharge — it includes discharge diagnosis, discharge condition, medications at discharge, and the follow-up plan. It is the primary document exchanged during hospital-to-SNF or hospital-to-home transitions."},
                  {"id": "q_cda1d", "text": "Referral Note", "isCorrect": False, "explanation": "Referral Notes are used when a provider refers a patient to a specialist — not for hospital discharge transitions."}
                ],
                "explanation": "Different C-CDA templates serve different clinical events. Discharge Summary = hospital discharge. CCD = general summary or outpatient care transition. Referral Note = specialist referral. Knowing which template applies to which workflow is essential for HIE implementation."
              },
              {
                "id": "q_cda2",
                "prompt": "What is the primary limitation of C-CDA for clinical data exchange compared to FHIR?",
                "type": "single_choice",
                "options": [
                  {"id": "q_cda2a", "text": "C-CDA cannot include medication information", "isCorrect": False, "explanation": "Medications are a required section in most C-CDA templates including the CCD. This is not a limitation of C-CDA."},
                  {"id": "q_cda2b", "text": "C-CDA is a document format, not discrete data — making automated extraction of individual data elements difficult", "isCorrect": True, "explanation": "C-CDA is fundamentally a document — it wraps data in sections and entries designed for human reading. While structured entries exist, quality and consistency are poor across implementations. FHIR exposes discrete, queryable resources that applications can reliably process programmatically."},
                  {"id": "q_cda2c", "text": "C-CDA requires a paid HL7 license to implement", "isCorrect": False, "explanation": "While HL7 does charge for some specifications, C-CDA implementation does not require a per-implementation license. The standard is widely implemented at no royalty cost."},
                  {"id": "q_cda2d", "text": "C-CDA is not supported by any major EHR vendor", "isCorrect": False, "explanation": "C-CDA is supported by all major EHR vendors and is required for ONC certification. It is among the most widely implemented health data standards in the US."}
                ],
                "explanation": "The document-vs-discrete-data distinction is critical. C-CDA packages data in a human-readable document. FHIR exposes data as discrete, queryable resources. For population health analytics, AI applications, and automated workflows, FHIR's discrete data model is far superior."
              },
              {
                "id": "q_cda3",
                "prompt": "Under which federal program was C-CDA made a requirement for certified EHR technology?",
                "type": "single_choice",
                "options": [
                  {"id": "q_cda3a", "text": "HIPAA", "isCorrect": False, "explanation": "HIPAA (1996) predates C-CDA and does not specify technical standards for clinical documents. HIPAA addresses privacy and security, not clinical data exchange formats."},
                  {"id": "q_cda3b", "text": "Meaningful Use (HITECH Act)", "isCorrect": True, "explanation": "The HITECH Act's Meaningful Use program (2009–2016) required certified EHRs to generate and receive C-CDA documents for transitions of care. This mandate drove widespread C-CDA adoption across US hospitals and ambulatory practices."},
                  {"id": "q_cda3c", "text": "21st Century Cures Act", "isCorrect": False, "explanation": "The 21st Century Cures Act (2016) shifted focus to FHIR APIs and information blocking, not C-CDA. However, C-CDA remains required for some Promoting Interoperability measures under MIPS."},
                  {"id": "q_cda3d", "text": "MACRA", "isCorrect": False, "explanation": "MACRA (2015) created the Quality Payment Program including MIPS and APMs. While MIPS includes Promoting Interoperability measures that involve C-CDA, MACRA itself did not create the C-CDA requirement."}
                ],
                "explanation": "Meaningful Use under the HITECH Act was the driving force behind C-CDA adoption. Hospitals and clinicians needed to generate and share C-CDAs to meet stage 2 and 3 Meaningful Use requirements."
              },
              {
                "id": "q_cda4",
                "prompt": "A hospital's care transition coordinator receives a C-CDA discharge summary from a referring hospital but finds the medication list is incomplete and contains duplicate entries. This is an example of which problem?",
                "type": "single_choice",
                "options": [
                  {"id": "q_cda4a", "text": "Foundational interoperability failure — the document could not be transmitted", "isCorrect": False, "explanation": "The document was transmitted successfully. The problem is not with transmission but with the quality of data within the document."},
                  {"id": "q_cda4b", "text": "C-CDA data quality variation across EHR implementations", "isCorrect": True, "explanation": "C-CDA defines structure but cannot enforce data quality. Different EHRs populate C-CDA sections differently, leading to incomplete medication lists, duplicate entries, and missing data elements. Studies show 60%+ of C-CDAs have at least one data quality issue."},
                  {"id": "q_cda4c", "text": "HIPAA violation by the sending hospital", "isCorrect": False, "explanation": "Sending an incomplete C-CDA is a data quality problem, not a HIPAA violation. HIPAA governs privacy and security, not the completeness of clinical documentation."},
                  {"id": "q_cda4d", "text": "Incompatible FHIR versions between the two hospitals", "isCorrect": False, "explanation": "This scenario involves C-CDA, not FHIR. FHIR version incompatibility is a different problem that would manifest in FHIR API exchanges, not C-CDA document exchange."}
                ],
                "explanation": "C-CDA data quality variation is one of the most pervasive real-world challenges in health information exchange. Receiving organizations must build validation pipelines and clinicians must verify C-CDA content against their own records."
              }
            ]
          }
        }
      ]
    },
    {
      "id": "track_cures_info_blocking",
      "courseId": "course_interoperability",
      "pillar": "policy",
      "order": 2,
      "slug": "cures-act-info-blocking",
      "title": "21st Century Cures Act & Information Blocking",
      "description": "The landmark 2016 law and its 2020 ONC Final Rule — what information blocking means, who it applies to, and the eight exceptions that define lawful practice.",
      "isPublished": True,
      "createdAt": "2026-05-26T00:00:00Z",
      "updatedAt": "2026-05-26T00:00:00Z",
      "lessons": [
        {
          "id": "lesson_cures_overview",
          "trackId": "track_cures_info_blocking",
          "pillar": "policy",
          "order": 1,
          "slug": "21st-century-cures-act-overview",
          "title": "The 21st Century Cures Act: A Landmark in Health IT Law",
          "summary": "How the bipartisan 2016 law reshaped health IT policy — mandating patient data access, defining information blocking, and setting the stage for FHIR API adoption.",
          "estimatedMinutes": 18,
          "isPublished": True,
          "tags": ["Cures Act","ONC","information blocking","FHIR","policy"],
          "relatedLessonIds": ["lesson_information_blocking"],
          "createdAt": "2026-05-26T00:00:00Z",
          "updatedAt": "2026-05-26T00:00:00Z",
          "objectives": [
            {"id": "obj_cures1", "text": "Identify the three major domains of the 21st Century Cures Act"},
            {"id": "obj_cures2", "text": "Explain what ONC's 2020 Final Rule required and the key compliance dates"},
            {"id": "obj_cures3", "text": "Describe the three types of actors subject to information blocking rules"}
          ],
          "contentBlocks": [
            {
              "type": "text",
              "heading": "A rare bipartisan achievement",
              "body": "The 21st Century Cures Act was signed into law by President Obama on December 13, 2016, passing the House 392-26 and the Senate 94-5 — a level of bipartisan support rarely seen in US healthcare legislation. The law addressed three major domains: accelerating drug and device approval at FDA, strengthening mental health services, and — most relevant to health IT — mandating interoperability and prohibiting information blocking.\n\nThe health IT provisions of the Cures Act represented a fundamental shift in the federal government's approach to health data exchange. Where previous programs (Meaningful Use, the EHR incentive program) used financial carrots to encourage EHR adoption and data sharing, the Cures Act added a stick: practices that interfere with the access, exchange, or use of electronic health information are not just undesirable — they are potentially illegal, subject to civil monetary penalties of up to $1 million per violation for health IT developers.\n\nONC took nearly four years to translate the Cures Act's health IT provisions into regulation, publishing the 21st Century Cures Act Final Rule in March 2020. That rule had two major components: the information blocking rule (effective April 5, 2021) and the interoperability standards conditions requiring FHIR R4 APIs in certified EHR technology."
            },
            {
              "type": "timeline",
              "heading": "21st Century Cures Act milestones",
              "events": [
                {"year": "2016", "label": "Cures Act enacted", "description": "Bipartisan passage with 392-26 in House, 94-5 in Senate. Signed December 13."},
                {"year": "2020", "label": "ONC Final Rule", "description": "ONC publishes 21st Century Cures Act Final Rule — information blocking rules, FHIR R4 API requirements, conditions of certification."},
                {"year": "Apr 2021", "label": "Information blocking effective", "description": "Information blocking provisions become effective for all three actor types. Complaints begin."},
                {"year": "Oct 2022", "label": "USCDI v1 required", "description": "CEHRT must support USCDI v1 data set and standardized FHIR R4 API."},
                {"year": "2023", "label": "OIG enforcement", "description": "OIG begins publishing information blocking complaint data. First disincentives for healthcare providers established."},
                {"year": "2024", "label": "USCDI v3", "description": "ONC updates USCDI to v3, expanding required data classes to include SDOH, sexual orientation, and gender identity."}
              ]
            },
            {
              "type": "concepts_grid",
              "heading": "Three types of information blocking actors",
              "items": [
                {"term": "Health IT Developers", "definition": "Companies that develop certified health IT (EHR vendors, FHIR server vendors). Face the harshest penalties — up to $1M per violation in civil monetary penalties from ONC."},
                {"term": "Health Information Networks/Exchanges", "definition": "Organizations that operate networks or services for health information exchange — HIEs, health information networks, query-based exchange services."},
                {"term": "Healthcare Providers", "definition": "Hospitals, physician practices, clinics, and other providers who use EHR systems. Face 'disincentives' — impacts on CMS payment programs like MIPS — rather than direct fines."}
              ]
            },
            {
              "type": "callout",
              "variant": "info",
              "title": "What changed for patients on April 5, 2021",
              "body": "Beginning April 5, 2021, patients gained an enforceable right to access their electronic health information through standardized FHIR APIs — meaning they can connect any certified third-party app to their EHR and pull their own data. Before this date, patient data access was discretionary. After this date, blocking or unduly restricting patient data access became potentially illegal. Patients can now use apps like Apple Health, CommonHealth, and hundreds of others to access their own records."
            },
            {
              "type": "key_stat",
              "value": "$1M",
              "label": "maximum civil monetary penalty per information blocking violation",
              "context": "Health IT developers face up to $1 million per information blocking violation. Healthcare providers face disincentives through CMS payment programs. The financial stakes are designed to change the economics of information blocking."
            }
          ],
          "quiz": {
            "id": "quiz_cures",
            "lessonId": "lesson_cures_overview",
            "passingScore": 75,
            "questions": [
              {
                "id": "q_cures1",
                "prompt": "Which of the following is NOT one of the three major domains of the 21st Century Cures Act?",
                "type": "single_choice",
                "options": [
                  {"id": "q_cures1a", "text": "FDA drug and device approval acceleration", "isCorrect": False, "explanation": "FDA innovation (including breakthrough device designation and accelerated approval pathways) is indeed one of the three major domains of the Cures Act."},
                  {"id": "q_cures1b", "text": "Mental health services strengthening", "isCorrect": False, "explanation": "Mental health provisions — including the creation of an Assistant Secretary for Mental Health and Substance Use — are a major component of the Cures Act."},
                  {"id": "q_cures1c", "text": "Medicaid eligibility expansion", "isCorrect": True, "explanation": "Medicaid eligibility expansion was part of the Affordable Care Act (2010), not the 21st Century Cures Act (2016). The Cures Act's three domains are FDA innovation, mental health, and health IT/interoperability."},
                  {"id": "q_cures1d", "text": "Health IT interoperability and information blocking", "isCorrect": False, "explanation": "Health IT interoperability, including the information blocking prohibition and FHIR API requirements, is the third major domain of the Cures Act."}
                ],
                "explanation": "The 21st Century Cures Act covers three domains: (1) FDA drug and device innovation, (2) mental health services, and (3) health IT interoperability and information blocking. Medicaid expansion is not part of this law."
              },
              {
                "id": "q_cures2",
                "prompt": "Under the Cures Act, which type of actor faces the highest financial penalty — up to $1 million per violation — for information blocking?",
                "type": "single_choice",
                "options": [
                  {"id": "q_cures2a", "text": "Healthcare providers (hospitals and physician practices)", "isCorrect": False, "explanation": "Healthcare providers face 'disincentives' through CMS payment programs (like MIPS penalties), not direct $1M civil monetary penalties. OIG enforces against providers through program integrity mechanisms."},
                  {"id": "q_cures2b", "text": "Health IT developers (EHR vendors)", "isCorrect": True, "explanation": "Health IT developers — including EHR vendors and FHIR server companies — face up to $1 million per information blocking violation in civil monetary penalties assessed by ONC. This is the highest direct financial penalty."},
                  {"id": "q_cures2c", "text": "Individual clinicians", "isCorrect": False, "explanation": "Individual clinicians are typically covered under the healthcare provider category, which faces disincentives rather than direct $1M penalties."},
                  {"id": "q_cures2d", "text": "Patients who share their own data with third-party apps", "isCorrect": False, "explanation": "Patients are explicitly not subject to information blocking rules — the law is designed to expand patient access, not restrict it. Patients can share their own data with any app they choose."}
                ],
                "explanation": "The Cures Act created a tiered enforcement framework. Health IT developers face the steepest direct penalties ($1M/violation from ONC) because they control the technology infrastructure that enables or blocks data exchange."
              },
              {
                "id": "q_cures3",
                "prompt": "The ONC Final Rule implementing the Cures Act's information blocking provisions became effective on which date?",
                "type": "single_choice",
                "options": [
                  {"id": "q_cures3a", "text": "December 13, 2016 (when the Cures Act was signed)", "isCorrect": False, "explanation": "The Cures Act was signed in December 2016, but ONC took nearly four years to write the implementing regulations. The information blocking rule did not take effect until 2021."},
                  {"id": "q_cures3b", "text": "January 1, 2020", "isCorrect": False, "explanation": "ONC published the Final Rule in March 2020, but the information blocking provisions had a delayed effective date to give actors time to prepare."},
                  {"id": "q_cures3c", "text": "April 5, 2021", "isCorrect": True, "explanation": "The information blocking provisions of ONC's 21st Century Cures Act Final Rule became effective April 5, 2021. This is also the date when patients gained enforceable rights to access their health data through FHIR APIs."},
                  {"id": "q_cures3d", "text": "October 6, 2022", "isCorrect": False, "explanation": "October 2022 was the compliance date for additional CEHRT requirements — specifically the standardized FHIR R4 API criterion. The information blocking rule itself was effective April 5, 2021."}
                ],
                "explanation": "April 5, 2021 is a landmark date in health IT policy — the day information blocking became legally prohibited and patients gained standardized API access to their health data."
              },
              {
                "id": "q_cures4",
                "prompt": "A health IT developer designs their EHR so that data export through the standardized FHIR API is technically possible but so slow that it is practically unusable. Is this information blocking?",
                "type": "single_choice",
                "options": [
                  {"id": "q_cures4a", "text": "No — information blocking only applies to complete denial of access, not degraded performance", "isCorrect": False, "explanation": "The Cures Act and ONC regulations define information blocking broadly — practices that 'interfere with' data access count, not just complete denial. Intentional performance throttling that makes access practically unusable would likely constitute information blocking."},
                  {"id": "q_cures4b", "text": "Yes — deliberately degrading API performance to prevent practical use can constitute information blocking", "isCorrect": True, "explanation": "ONC has made clear that information blocking includes technical practices that interfere with data access without completely blocking it. Intentional performance throttling, excessive rate limiting, or unreliable API uptime that renders the API practically unusable would likely be found to constitute information blocking."},
                  {"id": "q_cures4c", "text": "No — API performance is a technical matter outside the scope of information blocking law", "isCorrect": False, "explanation": "ONC's information blocking regulations cover both policy-based and technical practices that interfere with data exchange. There is no carve-out for technical performance issues caused by intentional design choices."},
                  {"id": "q_cures4d", "text": "Only if the developer also charges extra fees for faster access", "isCorrect": False, "explanation": "Fee-based performance tiers might implicate the Fees Exception, but deliberate throttling to prevent practical use is a separate concern. Information blocking can occur without any fee arrangement."}
                ],
                "explanation": "Information blocking is defined broadly to cover any practice that 'interferes with, prevents, or materially discourages' data access. Technical means of interference — including performance throttling — are within scope."
              }
            ]
          }
        },
        {
          "id": "lesson_information_blocking",
          "trackId": "track_cures_info_blocking",
          "pillar": "policy",
          "order": 2,
          "slug": "information-blocking-rules",
          "title": "Information Blocking: Definition, Eight Exceptions & Enforcement",
          "summary": "What constitutes information blocking under the Cures Act, the eight regulatory exceptions that define lawful practice, and how ONC and OIG enforce the rules.",
          "estimatedMinutes": 22,
          "isPublished": True,
          "tags": ["information blocking","ONC","OIG","exceptions","enforcement","Cures Act"],
          "relatedLessonIds": ["lesson_cures_overview","lesson_patient_rights_hipaa"],
          "createdAt": "2026-05-26T00:00:00Z",
          "updatedAt": "2026-05-26T00:00:00Z",
          "objectives": [
            {"id": "obj_ib1", "text": "State the statutory definition of information blocking"},
            {"id": "obj_ib2", "text": "Name the eight information blocking exceptions and describe three in detail"},
            {"id": "obj_ib3", "text": "Distinguish between ONC and OIG enforcement roles and their respective targets"}
          ],
          "contentBlocks": [
            {
              "type": "text",
              "heading": "Defining what cannot be done",
              "body": "The 21st Century Cures Act defines information blocking as a practice that — the actor knows or should know — is likely to interfere with, prevent, or materially discourage access, exchange, or use of electronic health information. The key elements of this definition deserve careful attention. First, it is intent-sensitive: actors who should have known their practice would interfere cannot claim innocent ignorance. Second, 'materially discourage' is a lower bar than 'prevent' — practices that make data access difficult, slow, expensive, or burdensome without completely blocking it can still constitute information blocking. Third, the definition covers access, exchange, AND use — meaning restrictions on how data can be used after it has been shared also fall within scope.\n\nONC received nearly 700 information blocking complaints in the first two years of enforcement (April 2021–March 2023). The most common complaints involved: providers restricting patient access to their own records, health IT developers charging unreasonable fees for data export, and HIEs refusing to connect with competing networks. ONC publishes complaint data in aggregate, but individual enforcement actions against health IT developers — the highest-penalty category — have been slower to materialize as ONC builds its enforcement infrastructure.\n\nCritically, the information blocking rules do not apply to all health information. They apply specifically to 'electronic health information' (EHI) — a defined term that initially covered the data elements in USCDI v1 (as of April 2021) and was later expanded to cover all EHI that a HIPAA covered entity would include in a designated record set (as of October 2022). This expansion significantly broadened the scope of what must be shared upon request."
            },
            {
              "type": "comparison_table",
              "heading": "The eight information blocking exceptions",
              "headers": ["Exception", "Purpose", "Key Conditions"],
              "rows": [
                ["Preventing Harm", "Allow withholding data that would endanger patient or third party", "Must be documented, reasonable belief of harm, minimum necessary restriction"],
                ["Privacy", "Allow compliance with patient privacy preferences and state law", "Must reflect documented patient request or applicable privacy law"],
                ["Security", "Allow security-motivated access restrictions", "Must be consistent with recognized security practices, applied consistently"],
                ["Infeasibility", "Allow non-compliance when technically or legally infeasible", "Must document the infeasibility; undue burden has narrow scope"],
                ["Health IT Performance", "Allow downtime and maintenance affecting data access", "Must be consistent with industry-standard practices, cannot be used as pretext"],
                ["Content & Manner", "Allow actors to limit HOW data is provided (format, timing)", "Must offer at least one compliant method; cannot unreasonably restrict"],
                ["Fees", "Allow charging fees for data exchange services", "Must be cost-based, reasonable, applied consistently; no exclusionary pricing"],
                ["Licensing", "Allow protecting proprietary interfaces and technology", "Cannot be used to prevent interoperability; narrow scope"]
              ]
            },
            {
              "type": "callout",
              "variant": "warning",
              "title": "The Fees Exception: when charging is and isn't allowed",
              "body": "The Fees Exception allows actors to charge for data exchange services — but with strict conditions. Fees must be based on the cost of exchange (not a markup for competitive advantage), must be applied consistently (you cannot charge a competitor more than you charge a partner), and cannot be used to exclude access that would otherwise be required. Charging $0.10/record for bulk export is likely fine. Charging $50,000 to connect a competing HIE when you charge $1,000 to connect partners is likely information blocking. ONC has seen many complaints in this category."
            },
            {
              "type": "key_stat",
              "value": "700+",
              "label": "information blocking complaints received by ONC (first 2 years)",
              "context": "ONC received approximately 700 information blocking complaints in the first two years of enforcement. The largest share involved healthcare providers limiting patient access to records, followed by health IT developer practices. ONC refers cases involving healthcare providers to OIG for investigation."
            },
            {
              "type": "callout",
              "variant": "info",
              "title": "ONC vs. OIG: who enforces what",
              "body": "ONC has civil monetary penalty authority over health IT developers and health information networks (up to $1M/violation). Healthcare providers are referred to OIG, which can impose 'disincentives' — specifically, impacts on providers' CMS quality payment program participation. The first healthcare provider disincentives were established in rules finalized in 2024. This bifurcated enforcement structure reflects the different leverage available over each actor type."
            }
          ],
          "quiz": {
            "id": "quiz_info_blocking",
            "lessonId": "lesson_information_blocking",
            "passingScore": 75,
            "questions": [
              {
                "id": "q_ib1",
                "prompt": "A hospital refuses to send patient records to a competing health system's HIE, claiming the other system's FHIR implementation is 'not secure enough.' Under what exception might this be justified — and what must the hospital demonstrate?",
                "type": "single_choice",
                "options": [
                  {"id": "q_ib1a", "text": "Privacy Exception — the hospital must show the patient did not consent to sharing", "isCorrect": False, "explanation": "The Privacy Exception applies to patient-specific privacy preferences or state law restrictions. A security concern about a receiving system is not a privacy issue."},
                  {"id": "q_ib1b", "text": "Security Exception — but the hospital must show the security concern is consistent with recognized security practices and applied consistently", "isCorrect": True, "explanation": "The Security Exception allows restricting access for legitimate security reasons — but the concern must be based on recognized security practices (like NIST frameworks), must be documented, and must be applied consistently. A hospital cannot apply security concerns only to competitors while accepting the same security posture from partners."},
                  {"id": "q_ib1c", "text": "Infeasibility Exception — because connecting to a competing HIE is technically too difficult", "isCorrect": False, "explanation": "The Infeasibility Exception covers genuine technical or legal inability to share — not competitive reluctance to connect. 'Too difficult' is not infeasibility if the capability exists."},
                  {"id": "q_ib1d", "text": "Licensing Exception — the hospital can protect its proprietary data from competitors", "isCorrect": False, "explanation": "The Licensing Exception applies to protecting proprietary interfaces and technology, not patient data. Patient records are not the hospital's proprietary intellectual property."}
                ],
                "explanation": "The Security Exception provides a legitimate basis for refusing connections that pose genuine security risks — but requires documented, consistent, and recognized-standard-based security concerns. Pretextual security claims used to block competitors would not qualify."
              },
              {
                "id": "q_ib2",
                "prompt": "A patient requests their complete medical record in electronic format. The hospital offers to provide it as a printed paper document or as a PDF scanned from paper. Is this information blocking?",
                "type": "single_choice",
                "options": [
                  {"id": "q_ib2a", "text": "No — any format satisfies the patient access requirement", "isCorrect": False, "explanation": "The Cures Act and ONC regulations specifically require electronic access in a standardized format (FHIR R4 for CEHRT systems). Paper or scanned PDFs are not compliant with the electronic access requirement."},
                  {"id": "q_ib2b", "text": "Yes — patients have a right to electronic access through standardized APIs; offering only paper or PDF can constitute information blocking under the Content & Manner Exception analysis", "isCorrect": True, "explanation": "The Content & Manner Exception allows actors to negotiate the format of delivery — but they must offer at least one compliant electronic method. Offering only paper or a scanned PDF for data that must be accessible electronically would not meet the exception conditions and could constitute information blocking."},
                  {"id": "q_ib2c", "text": "No — HIPAA only requires records be provided within 30 days in any accessible format", "isCorrect": False, "explanation": "HIPAA's right of access rule predates the Cures Act and has lower requirements. The Cures Act adds a layer specifically requiring electronic access through standardized APIs for information in CEHRT systems."},
                  {"id": "q_ib2d", "text": "Only if the hospital also charges more than $6.50 for the records", "isCorrect": False, "explanation": "The $6.50 limit is from OCR's HIPAA right of access enforcement — a separate framework. Information blocking analysis under the Cures Act examines whether the format restriction interferes with electronic access, regardless of cost."}
                ],
                "explanation": "Electronic access is the core patient right under the Cures Act. Directing patients to paper copies when their data is stored electronically in a certified EHR is a Content & Manner issue that can constitute information blocking."
              },
              {
                "id": "q_ib3",
                "prompt": "The Cures Act's information blocking rules apply to which type of health data?",
                "type": "single_choice",
                "options": [
                  {"id": "q_ib3a", "text": "Only data stored in certified EHR technology", "isCorrect": False, "explanation": "Information blocking rules apply to Electronic Health Information (EHI) more broadly — not limited to CEHRT systems. After October 2022, EHI covers all data that would be included in a HIPAA designated record set."},
                  {"id": "q_ib3b", "text": "Electronic health information (EHI), which after October 2022 covers all data in a HIPAA designated record set", "isCorrect": True, "explanation": "EHI scope expanded in two phases. Initially (April 2021) it covered USCDI v1 data elements. After October 2022, it expanded to cover all EHI that a covered entity would include in a designated record set — a much broader definition."},
                  {"id": "q_ib3c", "text": "Only claims data submitted to Medicare and Medicaid", "isCorrect": False, "explanation": "Information blocking rules apply to clinical EHI — not specifically to claims data. Claims data falls under separate CMS data exchange requirements."},
                  {"id": "q_ib3d", "text": "All health data including verbal communications between providers", "isCorrect": False, "explanation": "Information blocking rules apply specifically to ELECTRONIC health information. Verbal communications, paper records not scanned into electronic systems, and other non-electronic information fall outside the information blocking regulatory scope."}
                ],
                "explanation": "Understanding what data is covered by information blocking rules is essential for compliance. The October 2022 expansion to all EHI in the designated record set was a significant broadening of scope that many organizations missed."
              },
              {
                "id": "q_ib4",
                "prompt": "An EHR vendor charges $500,000 to establish a data sharing connection with a regional HIE, while charging its own affiliated health system $5,000 for the same connection. Which exception is most likely implicated — and does the practice qualify?",
                "type": "single_choice",
                "options": [
                  {"id": "q_ib4a", "text": "Preventing Harm Exception — the HIE may introduce security vulnerabilities", "isCorrect": False, "explanation": "Security concerns would be analyzed under the Security Exception, not Preventing Harm. And the 100x price differential is not consistent with the Security Exception analysis."},
                  {"id": "q_ib4b", "text": "Fees Exception — and this practice likely does NOT qualify because fees must be applied consistently and cannot be used to disadvantage competitors", "isCorrect": True, "explanation": "The Fees Exception allows cost-based, reasonably applied fees. Charging 100x more to a non-affiliated HIE than to an affiliated partner is inconsistent application that appears designed to disadvantage a competitor — a textbook information blocking scenario that the Fees Exception would not protect."},
                  {"id": "q_ib4c", "text": "Licensing Exception — the vendor can protect its proprietary connection technology", "isCorrect": False, "explanation": "The Licensing Exception protects proprietary interfaces and intellectual property, not the right to charge discriminatory prices for data connections."},
                  {"id": "q_ib4d", "text": "Content & Manner Exception — the vendor can choose which organizations to connect with", "isCorrect": False, "explanation": "The Content & Manner Exception governs the format and manner of data delivery — not selective exclusion of trading partners. Refusing to connect or charging prohibitive fees to specific partners is not a Content & Manner issue."}
                ],
                "explanation": "Discriminatory pricing — charging vastly different amounts to competitors vs. partners for equivalent services — is among the clearest examples of the Fees Exception not applying. ONC designed the exception to allow reasonable cost recovery, not competitive exclusion."
              }
            ]
          }
        },
        {
          "id": "lesson_cehrt",
          "trackId": "track_cures_info_blocking",
          "pillar": "policy",
          "order": 3,
          "slug": "certified-ehr-technology-requirements",
          "title": "Certified EHR Technology: What CEHRT Means in Practice",
          "summary": "ONC's Health IT Certification Program — why CEHRT matters for payment programs, what the 2015 Edition Cures Update requires, and how to look up certification status.",
          "estimatedMinutes": 16,
          "isPublished": True,
          "tags": ["CEHRT","ONC","certification","FHIR","Meaningful Use","MIPS"],
          "relatedLessonIds": ["lesson_cures_overview"],
          "createdAt": "2026-05-26T00:00:00Z",
          "updatedAt": "2026-05-26T00:00:00Z",
          "objectives": [
            {"id": "obj_cert1", "text": "Explain what certified EHR technology is and why certification matters for CMS payment programs"},
            {"id": "obj_cert2", "text": "Describe the key requirements of the 2015 Edition Cures Update certification criteria"},
            {"id": "obj_cert3", "text": "Identify how to look up an EHR product's certification status on the CHPL"}
          ],
          "contentBlocks": [
            {
              "type": "text",
              "heading": "Certification as the gateway to payment",
              "body": "Certified EHR Technology (CEHRT) is not just a technical designation — it is a prerequisite for participation in multiple CMS payment programs. Eligible clinicians must use CEHRT to report the Promoting Interoperability category under MIPS. Hospitals must use CEHRT to attest to the Promoting Interoperability program. ACOs in the Medicare Shared Savings Program must use CEHRT. In this sense, ONC's certification program operates as a regulatory lever: by defining what certified technology must do, ONC shapes what health IT capabilities are available across the entire Medicare and Medicaid ecosystem.\n\nThe current baseline is the 2015 Edition Cures Update — a revision to the 2015 Edition certification criteria that incorporates the requirements of the 21st Century Cures Act. The most significant addition is the standardized API criterion: certified technology must offer a FHIR R4 API that supports the US Core Implementation Guide profiles, implements SMART on FHIR for authorization, and is available without special effort for any patient or application that meets the standard terms of service.\n\nCertification is performed by ONC-Authorized Certification Bodies (ONC-ACBs) — private organizations accredited by ONC to test and certify health IT products against the certification criteria. The two largest ONC-ACBs are Drummond Group and ICSA Labs. Certification is product-specific: each EHR version must be separately tested and certified, which is why the Certified Health IT Product List (CHPL) may show dozens of certifications for a single EHR vendor across different product versions."
            },
            {
              "type": "key_stat",
              "value": "96%",
              "label": "of non-federal acute care hospitals had certified EHR technology (2023)",
              "context": "EHR adoption driven by the HITECH Act incentive program reached near-saturation in hospitals by 2015. As of 2023, 96% of non-federal acute care hospitals use certified EHR technology, compared to 28% in 2011."
            },
            {
              "type": "callout",
              "variant": "tip",
              "title": "Looking up CEHRT status on the CHPL",
              "body": "The Certified Health IT Product List (CHPL) at chpl.healthit.gov is ONC's public database of all certified health IT products. Anyone can search by developer name, product name, or certification ID. The CHPL shows which certification criteria each product meets, any surveillance findings (compliance issues found after certification), and whether certification has been withdrawn. Before implementing an EHR or relying on a system's certification for MIPS reporting, verify its CHPL status."
            },
            {
              "type": "concepts_grid",
              "heading": "2015 Edition Cures Update key criteria",
              "items": [
                {"term": "Standardized API (g10)", "definition": "Must provide a FHIR R4 API supporting US Core profiles, SMART on FHIR authorization, and bulk FHIR export. The core interoperability requirement."},
                {"term": "Electronic Prescribing (b1)", "definition": "Must support electronic prescribing to pharmacies via NCPDP SCRIPT standard, including controlled substance prescribing (EPCS)."},
                {"term": "Clinical Information Reconciliation (b2)", "definition": "Must support reconciliation of problem list, medication list, and medication allergy list when receiving C-CDA documents."},
                {"term": "Real-Time Prescription Benefit (b11)", "definition": "Must support real-time benefit check — displaying patient-specific drug cost and formulary information at time of prescribing."},
                {"term": "Patient Demographics (a5)", "definition": "Must capture sexual orientation, gender identity, and expanded race/ethnicity categories per ONC requirements."},
                {"term": "Conditions & Maintenance (d12–d13)", "definition": "Certified products must meet real-world testing, transparency disclosure, and assurance conditions — not just pass lab testing."}
              ]
            }
          ],
          "quiz": {
            "id": "quiz_cehrt",
            "lessonId": "lesson_cehrt",
            "passingScore": 75,
            "questions": [
              {
                "id": "q_cert1",
                "prompt": "Why does it matter whether a clinician's EHR is certified by ONC?",
                "type": "single_choice",
                "options": [
                  {"id": "q_cert1a", "text": "Uncertified EHRs are illegal to use in clinical practice", "isCorrect": False, "explanation": "There is no legal prohibition on using uncertified EHR software for clinical documentation. Certification matters because of its connection to payment programs, not because uncertified software is banned."},
                  {"id": "q_cert1b", "text": "CEHRT is required for participation in MIPS Promoting Interoperability, hospital Promoting Interoperability, and MSSP", "isCorrect": True, "explanation": "CEHRT is a prerequisite for multiple CMS payment programs. Without certified EHR technology, clinicians cannot report the Promoting Interoperability category under MIPS, hospitals cannot attest to their program, and ACOs cannot participate in MSSP."},
                  {"id": "q_cert1c", "text": "Only certified EHRs can submit claims to Medicare", "isCorrect": False, "explanation": "Claims submission to Medicare does not require CEHRT. Claims can be submitted through non-certified billing systems. CEHRT is specifically tied to quality and interoperability payment programs."},
                  {"id": "q_cert1d", "text": "ONC certification guarantees the EHR has no security vulnerabilities", "isCorrect": False, "explanation": "ONC certification tests EHR functionality against specific criteria — it does not certify security perfection or guarantee the absence of vulnerabilities. Security is separately governed by HIPAA Security Rule requirements."}
                ],
                "explanation": "CEHRT is the gateway to CMS payment programs. This gives ONC substantial leverage to drive health IT capabilities — if vendors want their customers to participate in MIPS and MSSP, they must meet ONC's certification criteria."
              },
              {
                "id": "q_cert2",
                "prompt": "The Standardized API certification criterion (criterion g10) requires certified EHRs to implement which API standard?",
                "type": "single_choice",
                "options": [
                  {"id": "q_cert2a", "text": "HL7 v2 over HTTPS", "isCorrect": False, "explanation": "HL7 v2 is the legacy messaging standard. The g10 criterion specifically requires FHIR R4, not HL7 v2."},
                  {"id": "q_cert2b", "text": "FHIR R4 with US Core Implementation Guide and SMART on FHIR", "isCorrect": True, "explanation": "The g10 criterion requires a FHIR R4 API that supports US Core IG profiles, SMART on FHIR for authorization, and bulk data access. This is the technical foundation for patient access apps and payer-to-provider exchange."},
                  {"id": "q_cert2c", "text": "C-CDA document exchange via IHE XDS.b", "isCorrect": False, "explanation": "IHE XDS.b is an older document exchange profile. While C-CDA support is required under other certification criteria, the standardized API criterion specifically requires FHIR."},
                  {"id": "q_cert2d", "text": "SOAP web services with WSDL", "isCorrect": False, "explanation": "SOAP/WSDL is a legacy web service technology. ONC's certification requirements align with modern RESTful API standards, specifically FHIR R4."}
                ],
                "explanation": "The g10 criterion is the technical heart of ONC's interoperability mandate — requiring FHIR R4 APIs with US Core profiles and SMART on FHIR authorization in all certified EHR systems."
              },
              {
                "id": "q_cert3",
                "prompt": "Where can a hospital administrator verify that a prospective EHR vendor's product is currently certified and has no outstanding compliance issues?",
                "type": "single_choice",
                "options": [
                  {"id": "q_cert3a", "text": "The vendor's website", "isCorrect": False, "explanation": "Vendors may accurately represent their certification status, but the authoritative source is ONC's CHPL — not vendor self-reporting. Certification can be withdrawn or suspended."},
                  {"id": "q_cert3b", "text": "The Certified Health IT Product List (CHPL) at chpl.healthit.gov", "isCorrect": True, "explanation": "The CHPL is ONC's official public database of all certified health IT products. It shows current certification status, which criteria are met, any surveillance findings, and certification history. This is the authoritative source."},
                  {"id": "q_cert3c", "text": "The CMS Provider Enrollment database", "isCorrect": False, "explanation": "CMS Provider Enrollment tracks provider participation in Medicare/Medicaid programs — not EHR product certification. These are separate systems."},
                  {"id": "q_cert3d", "text": "The Joint Commission accreditation database", "isCorrect": False, "explanation": "The Joint Commission accredits healthcare organizations, not health IT products. EHR certification status is managed by ONC through the CHPL."}
                ],
                "explanation": "The CHPL (chpl.healthit.gov) is the authoritative public source for EHR certification status. Administrators should check CHPL before signing EHR contracts and periodically thereafter — certification can be withdrawn for non-compliance."
              },
              {
                "id": "q_cert4",
                "prompt": "An EHR vendor passes ONC certification testing but then disables the FHIR API in their production deployment to prevent competitor apps from accessing patient data. What mechanism addresses this?",
                "type": "single_choice",
                "options": [
                  {"id": "q_cert4a", "text": "Nothing — certification is a one-time test and ONC has no post-market authority", "isCorrect": False, "explanation": "ONC does have post-certification authority. The 2015 Edition Cures Update includes 'Conditions and Maintenance of Certification' requirements, and ONC conducts ongoing surveillance of certified products."},
                  {"id": "q_cert4b", "text": "ONC's surveillance program and Conditions of Certification — violations can result in certification suspension or withdrawal", "isCorrect": True, "explanation": "ONC conducts ongoing surveillance of certified health IT, including reactive surveillance (complaint-based) and random surveillance. Disabling certified capabilities in production violates Conditions of Certification and can result in corrective action, suspension, or decertification."},
                  {"id": "q_cert4c", "text": "The FTC's antitrust enforcement authority only", "isCorrect": False, "explanation": "While the FTC has investigated health IT market practices, ONC's certification program provides the primary regulatory mechanism for addressing post-certification non-compliance by health IT developers."},
                  {"id": "q_cert4d", "text": "HIPAA enforcement by OCR", "isCorrect": False, "explanation": "OCR enforces HIPAA privacy and security rules — not ONC certification compliance. Disabling FHIR APIs is a certification and information blocking issue under ONC/OIG jurisdiction, not a HIPAA violation per se."}
                ],
                "explanation": "Conditions and Maintenance of Certification is a critical feature of the 2015 Edition Cures Update. It extends ONC's authority beyond initial testing to ongoing compliance — addressing the risk that vendors pass testing but deploy differently in production."
              }
            ]
          }
        },
        {
          "id": "lesson_patient_rights_hipaa",
          "trackId": "track_cures_info_blocking",
          "pillar": "policy",
          "order": 4,
          "slug": "patient-access-rights-hipaa",
          "title": "Patient Access Rights: HIPAA, Cures Act & Third-Party Apps",
          "summary": "Patients have layered rights to access their health data — HIPAA's 30-day right of access, OCR enforcement, and the Cures Act's stronger electronic access mandate.",
          "estimatedMinutes": 15,
          "isPublished": True,
          "tags": ["patient access","HIPAA","right of access","OCR","third-party apps"],
          "relatedLessonIds": ["lesson_information_blocking","lesson_smart_fhir"],
          "createdAt": "2026-05-26T00:00:00Z",
          "updatedAt": "2026-05-26T00:00:00Z",
          "objectives": [
            {"id": "obj_par1", "text": "Explain HIPAA's right of access: timeline, format, fees"},
            {"id": "obj_par2", "text": "Describe how the Cures Act strengthens patient access beyond HIPAA"},
            {"id": "obj_par3", "text": "Explain what patients can and cannot do when authorizing third-party apps"}
          ],
          "contentBlocks": [
            {
              "type": "text",
              "heading": "Patients have a right to their own data — but it has been poorly enforced",
              "body": "HIPAA has included a right of access since the Privacy Rule took effect in 2003: patients can request their medical records, and covered entities must provide them within 30 days (with one 30-day extension) in the format requested if readily producible. Fees are limited to the cost of copying, labor, and postage. On paper, this is a strong right. In practice, it was routinely violated without consequence for nearly two decades.\n\nOCR's Right of Access Initiative, launched in 2019, changed this. OCR began actively investigating access complaints and imposing civil monetary penalties for violations — even small ones. A physician practice that takes 6 months to fulfill a simple records request, charges $400 for a simple copy, or refuses to send records directly to a patient's designated app now faces real enforcement risk. By 2024, OCR had imposed over $10 million in HIPAA right of access settlements.\n\nThe Cures Act adds a separate, stronger layer of patient access rights for data held in certified EHR systems. Patients can now direct their EHR provider to share their data with any third-party application that meets the standardized API terms of service — without the covered entity's permission to use a specific app. This patient-directed data sharing is a fundamental new right that goes beyond what HIPAA requires."
            },
            {
              "type": "comparison_table",
              "heading": "HIPAA Right of Access vs. Cures Act API Access",
              "headers": ["Dimension", "HIPAA Right of Access", "Cures Act API Access"],
              "rows": [
                ["Timeline", "30 days (60 with extension)", "Real-time or near-real-time"],
                ["Format", "Requested format if readily producible", "Standardized FHIR R4 API"],
                ["Scope", "Designated record set", "EHI (all data in CEHRT)"],
                ["Third-party direction", "Patient can designate a recipient", "Patient can connect any certified app"],
                ["Fees", "Cost-based, limited", "Cannot charge patients fees for their own data"],
                ["Enforcement", "OCR, up to $50,000/violation", "ONC/OIG information blocking rules"]
              ]
            },
            {
              "type": "callout",
              "variant": "warning",
              "title": "What patients authorize when connecting third-party apps",
              "body": "When a patient connects a third-party app to their EHR's FHIR API, they are authorizing that app to access their health data. The covered entity (hospital or provider) cannot veto this choice — but also cannot guarantee the app is HIPAA compliant. Once data moves to a third-party consumer app (like a wellness app or data aggregator), HIPAA no longer applies. The app is governed by its own privacy policy and FTC regulations. Patients should be counseled about this privacy tradeoff when connecting apps."
            },
            {
              "type": "key_stat",
              "value": "$10M+",
              "label": "in HIPAA right of access settlements (OCR, 2019–2024)",
              "context": "OCR's Right of Access Initiative brought real enforcement to a patient right that had been largely theoretical. Settlements range from $3,500 (small practices) to $240,000 (larger organizations) per violation."
            }
          ],
          "quiz": {
            "id": "quiz_patient_rights",
            "lessonId": "lesson_patient_rights_hipaa",
            "passingScore": 75,
            "questions": [
              {
                "id": "q_par1",
                "prompt": "Under HIPAA's right of access, what is the maximum time a covered entity has to fulfill a patient's records request?",
                "type": "single_choice",
                "options": [
                  {"id": "q_par1a", "text": "14 days", "isCorrect": False, "explanation": "14 days is not the HIPAA standard. Some state laws require faster turnaround, but HIPAA's standard is 30 days with one extension."},
                  {"id": "q_par1b", "text": "30 days, with one 30-day extension for good cause (60 days total)", "isCorrect": True, "explanation": "HIPAA requires covered entities to provide access within 30 days of the request. If more time is needed, one 30-day extension is permitted if the covered entity notifies the patient and explains the reason."},
                  {"id": "q_par1c", "text": "90 days", "isCorrect": False, "explanation": "90 days is not the HIPAA standard. The 60-day maximum (30 + 30-day extension) is already quite long for a records request — OCR has emphasized that faster response is expected in most circumstances."},
                  {"id": "q_par1d", "text": "There is no time limit under HIPAA", "isCorrect": False, "explanation": "HIPAA explicitly requires access within 30 days (60 with extension). There is a defined time limit, and violation of this limit is an OCR enforcement priority."}
                ],
                "explanation": "HIPAA's 30-day (60-day with extension) timeline is the federal floor. Some states require faster turnaround. OCR's enforcement has made clear that organizations should not use extensions as a default — they are for genuinely complex requests."
              },
              {
                "id": "q_par2",
                "prompt": "A hospital wants to prevent patients from connecting a specific consumer health app to its FHIR API because the hospital does not approve of the app's privacy policies. Under the Cures Act, can the hospital refuse?",
                "type": "single_choice",
                "options": [
                  {"id": "q_par2a", "text": "Yes — the hospital has the right to vet and approve all apps connecting to its systems", "isCorrect": False, "explanation": "The hospital can establish standard technical terms of service for API connections, but cannot selectively block apps it dislikes if they meet those terms. Blocking specific apps based on competitive concerns or app-specific disapproval is information blocking."},
                  {"id": "q_par2b", "text": "No — if the app meets the standardized API terms of service, the hospital cannot block patient-directed access", "isCorrect": True, "explanation": "The Cures Act gives patients the right to direct their data to any app meeting the API terms of service. Hospitals can set neutral, non-discriminatory terms — but cannot selectively block apps that meet those terms. Doing so would constitute information blocking."},
                  {"id": "q_par2c", "text": "Yes — HIPAA gives covered entities authority over all uses of PHI, including third-party app access", "isCorrect": False, "explanation": "HIPAA requires covered entity authorization for most PHI disclosures — but patient-directed access to one's own data is a specific exception. The Cures Act's patient access rights operate alongside HIPAA, and patients directing their own data to apps of their choice is expressly permitted."},
                  {"id": "q_par2d", "text": "Only if the app has been hacked in the past", "isCorrect": False, "explanation": "Security concerns could potentially be addressed through the Security Exception to information blocking — but historical breaches alone, without documented current risk assessment, are not sufficient grounds for blocking a specific app."}
                ],
                "explanation": "Patient-directed third-party app access is a core right under the Cures Act. Hospitals set terms of service but cannot selectively block compliant apps based on competitive concerns or preferences."
              },
              {
                "id": "q_par3",
                "prompt": "Once a patient's health data is shared with a consumer app (like a wellness app or fitness tracker) via FHIR API, which regulation primarily governs the app's use of that data?",
                "type": "single_choice",
                "options": [
                  {"id": "q_par3a", "text": "HIPAA — all health data is protected by HIPAA regardless of where it is stored", "isCorrect": False, "explanation": "HIPAA applies to covered entities (providers, payers, clearinghouses) and their business associates. Consumer apps that are not business associates of covered entities are generally not subject to HIPAA — even if they receive health data from a covered entity via patient direction."},
                  {"id": "q_par3b", "text": "FTC regulations and the app's own privacy policy", "isCorrect": True, "explanation": "Consumer health apps that receive patient-directed data are typically regulated by FTC consumer protection rules (including the Health Breach Notification Rule) and their own published privacy policies. HIPAA does not follow the data to non-covered entity apps."},
                  {"id": "q_par3c", "text": "ONC's information blocking rules", "isCorrect": False, "explanation": "ONC's information blocking rules govern actors (providers, health IT developers, HIEs) that control data access — not the apps that receive data after patient authorization."},
                  {"id": "q_par3d", "text": "The Cures Act prohibits consumer apps from using patient data for any purpose other than display", "isCorrect": False, "explanation": "The Cures Act does not restrict how consumer apps use data received through patient-directed API access. This is a gap in the regulatory framework that patient advocates have raised — once data leaves the covered entity's custody, HIPAA protections do not apply."}
                ],
                "explanation": "The 'HIPAA follows the data' myth is dangerous. HIPAA applies to covered entities and business associates — not to consumer apps receiving data through patient authorization. FTC and state privacy laws are the primary protections once data reaches consumer apps."
              },
              {
                "id": "q_par4",
                "prompt": "OCR's Right of Access Initiative (launched 2019) changed what about HIPAA enforcement?",
                "type": "single_choice",
                "options": [
                  {"id": "q_par4a", "text": "It created a new private right of action allowing patients to sue for access violations", "isCorrect": False, "explanation": "HIPAA does not have a private right of action — patients cannot sue directly under HIPAA. The Right of Access Initiative increased OCR's own enforcement activity, not patient litigation rights."},
                  {"id": "q_par4b", "text": "It began proactively investigating access complaints and imposing penalties even for smaller organizations", "isCorrect": True, "explanation": "The Right of Access Initiative marked a shift to active enforcement of patient access rights — OCR began investigating complaints, pursuing settlements even against small practices, and publicizing resolutions. This made the HIPAA right of access real after years of under-enforcement."},
                  {"id": "q_par4c", "text": "It reduced the records request response time from 30 days to 7 days", "isCorrect": False, "explanation": "The Right of Access Initiative did not change the 30-day response timeline. OCR has emphasized that organizations should not use extensions as a default, but the statutory timeframe remains 30 days."},
                  {"id": "q_par4d", "text": "It eliminated the fee that covered entities could charge for records", "isCorrect": False, "explanation": "Covered entities can still charge a reasonable cost-based fee for records. OCR has issued guidance limiting what can be included in that fee (e.g., no 'search and retrieval' fees for electronic records), but did not eliminate fees entirely."}
                ],
                "explanation": "OCR's Right of Access Initiative transformed patient records access from a theoretical right into an enforced one. The initiative demonstrated that small practices, clinics, and even individual physicians face real enforcement risk for non-compliance."
              }
            ]
          }
        }
      ]
    }
  ]
}

import os
out_path = os.path.join(os.path.dirname(__file__), "../content/course_interoperability.json")
with open(out_path, "w") as f:
    json.dump(course, f, indent=2)
print(f"Written {len(json.dumps(course))} chars to {out_path}")
print(f"Tracks: {len(course['tracks'])}, Lessons so far: {sum(len(t['lessons']) for t in course['tracks'])}")
