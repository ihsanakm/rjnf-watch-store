import type { Core } from '@strapi/strapi';

const PUBLIC_CONTENT_ACTIONS = [
  'api::product.product.find',
  'api::product.product.findOne',
  'api::hero-section.hero-section.find',
  'api::review.review.find',
  'api::review.review.findOne',
  'api::brand.brand.find',
  'api::brand.brand.findOne',
  'api::faq.faq.find',
  'api::faq.faq.findOne',
  'api::contact-section.contact-section.find',
  'api::page-heading.page-heading.find',
  'api::page-heading.page-heading.findOne',
  'api::footer-section.footer-section.find',
];

async function ensurePublicPermissions(strapi: Core.Strapi) {
  const publicRole = await strapi.db.query('plugin::users-permissions.role').findOne({
    where: { type: 'public' },
  });

  if (!publicRole) {
    strapi.log.warn('Public role not found; skipping storefront permission bootstrap.');
    return;
  }

  for (const action of PUBLIC_CONTENT_ACTIONS) {
    const existing = await strapi.db.query('plugin::users-permissions.permission').findOne({
      where: { action, role: publicRole.id },
    });

    if (!existing) {
      await strapi.db.query('plugin::users-permissions.permission').create({
        data: { action, role: publicRole.id },
      });
    }
  }

  strapi.log.info('Storefront Content API permissions are enabled for the Public role.');
}

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    await ensurePublicPermissions(strapi);
  },
};
