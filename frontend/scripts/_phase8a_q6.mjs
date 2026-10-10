import { db, getDoc } from './_phase8a_lib.mjs';
const { data } = await db.from('lessons').select('id,slug,sanity_slug,title').in('slug', ['interface-engines-integration','ehr-business-case-roi','snomed-loinc-rxnorm','uscdi-us-core-data','hipaa-security-rule','hie-data-governance-frameworks']);
for (const l of data) { const d = l.sanity_slug ? await getDoc(l.sanity_slug) : null; console.log(l.id, l.slug, l.sanity_slug, d ? d.body.length : 'NO DOC'); }
