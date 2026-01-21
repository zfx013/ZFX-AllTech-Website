import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Mentions Légales',
  description: 'Mentions légales du site ZFX AllTech - Développement web et logiciels sur mesure.',
};

export default function MentionsLegales() {
  return (
    <main className="min-h-screen pt-32 pb-20 bg-dark-950">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          {/* Back to Home Link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-dark-300 hover:text-violet-400 transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Retour à l&apos;accueil</span>
          </Link>

          {/* Header */}
          <div className="mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 gradient-text">
              Mentions Légales
            </h1>
            <p className="text-dark-400 text-lg">
              Informations légales concernant le site ZFX AllTech
            </p>
          </div>

          {/* Content */}
          <div className="space-y-10">
            {/* 1. Éditeur du site */}
            <section className="bg-dark-900/50 border border-dark-800 rounded-2xl p-8 hover:border-dark-700 transition-colors">
              <h2 className="text-3xl font-semibold text-white mb-6 flex items-center gap-3">
                <span className="text-violet-400">01.</span>
                Éditeur du site
              </h2>
              <div className="space-y-3 text-dark-300">
                <div className="flex flex-col sm:flex-row sm:gap-2">
                  <strong className="text-white min-w-[180px]">Raison sociale :</strong>
                  <span>ZFX AllTech (SASU)</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:gap-2">
                  <strong className="text-white min-w-[180px]">Siège social :</strong>
                  <span>Île-de-France, France</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:gap-2">
                  <strong className="text-white min-w-[180px]">Email :</strong>
                  <a href="mailto:contact@zfx-alltech.fr" className="text-violet-400 hover:text-violet-300 transition-colors">
                    contact@zfx-alltech.fr
                  </a>
                </div>
                <div className="flex flex-col sm:flex-row sm:gap-2">
                  <strong className="text-white min-w-[180px]">Téléphone :</strong>
                  <a href="tel:+33782251099" className="text-violet-400 hover:text-violet-300 transition-colors">
                    +33 7 82 25 10 99
                  </a>
                </div>
                <div className="flex flex-col sm:flex-row sm:gap-2">
                  <strong className="text-white min-w-[180px]">SIRET :</strong>
                  <span>En cours d&apos;immatriculation</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:gap-2">
                  <strong className="text-white min-w-[180px]">Directeur de publication :</strong>
                  <span>Le gérant de ZFX AllTech</span>
                </div>
              </div>
            </section>

            {/* 2. Hébergement */}
            <section className="bg-dark-900/50 border border-dark-800 rounded-2xl p-8 hover:border-dark-700 transition-colors">
              <h2 className="text-3xl font-semibold text-white mb-6 flex items-center gap-3">
                <span className="text-violet-400">02.</span>
                Hébergement
              </h2>
              <div className="space-y-3 text-dark-300">
                <div className="flex flex-col sm:flex-row sm:gap-2">
                  <strong className="text-white min-w-[180px]">Hébergeur :</strong>
                  <span>Vercel Inc.</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:gap-2">
                  <strong className="text-white min-w-[180px]">Adresse :</strong>
                  <span>340 S Lemon Ave #4133, Walnut, CA 91789, USA</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:gap-2">
                  <strong className="text-white min-w-[180px]">Site web :</strong>
                  <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-violet-400 hover:text-violet-300 transition-colors">
                    https://vercel.com
                  </a>
                </div>
              </div>
            </section>

            {/* 3. Propriété intellectuelle */}
            <section className="bg-dark-900/50 border border-dark-800 rounded-2xl p-8 hover:border-dark-700 transition-colors">
              <h2 className="text-3xl font-semibold text-white mb-6 flex items-center gap-3">
                <span className="text-violet-400">03.</span>
                Propriété intellectuelle
              </h2>
              <div className="space-y-4 text-dark-300 leading-relaxed">
                <p>
                  L&apos;ensemble du contenu présent sur ce site web, incluant mais non limité aux textes,
                  images, graphismes, logos, icônes, vidéos, sons, animations, logiciels, bases de données
                  et leur organisation, est la propriété exclusive de ZFX AllTech ou de ses partenaires
                  et est protégé par les lois françaises et internationales relatives à la propriété
                  intellectuelle et aux droits d&apos;auteur.
                </p>
                <p>
                  Toute reproduction, représentation, modification, publication, adaptation, transmission,
                  distribution ou exploitation de tout ou partie des éléments du site, quel que soit le
                  moyen ou le procédé utilisé, est strictement interdite, sauf autorisation écrite
                  préalable de ZFX AllTech.
                </p>
                <p>
                  L&apos;utilisation non autorisée du site ou de son contenu constitue une contrefaçon
                  et peut donner lieu à des poursuites judiciaires.
                </p>
              </div>
            </section>

            {/* 4. Limitation de responsabilité */}
            <section className="bg-dark-900/50 border border-dark-800 rounded-2xl p-8 hover:border-dark-700 transition-colors">
              <h2 className="text-3xl font-semibold text-white mb-6 flex items-center gap-3">
                <span className="text-violet-400">04.</span>
                Limitation de responsabilité
              </h2>
              <div className="space-y-4 text-dark-300 leading-relaxed">
                <p>
                  ZFX AllTech s&apos;efforce de fournir sur ce site des informations aussi précises
                  que possible. Toutefois, elle ne pourra être tenue responsable des omissions,
                  des inexactitudes et des carences dans la mise à jour, qu&apos;elles soient de son
                  fait ou du fait des tiers partenaires qui lui fournissent ces informations.
                </p>
                <p>
                  ZFX AllTech décline toute responsabilité quant aux éventuels dysfonctionnements
                  pouvant survenir sur le site et entraîner une perte de données, une indisponibilité
                  de l&apos;accès aux informations, ou tout autre problème technique.
                </p>
                <p>
                  L&apos;utilisateur reconnaît utiliser ces informations sous sa responsabilité
                  exclusive. ZFX AllTech ne pourra être tenue responsable de tout dommage direct
                  ou indirect résultant de l&apos;utilisation du site ou de l&apos;impossibilité d&apos;y accéder.
                </p>
              </div>
            </section>

            {/* 5. Liens hypertextes */}
            <section className="bg-dark-900/50 border border-dark-800 rounded-2xl p-8 hover:border-dark-700 transition-colors">
              <h2 className="text-3xl font-semibold text-white mb-6 flex items-center gap-3">
                <span className="text-violet-400">05.</span>
                Liens hypertextes
              </h2>
              <div className="space-y-4 text-dark-300 leading-relaxed">
                <p>
                  Le site peut contenir des liens hypertextes vers d&apos;autres sites internet.
                  ZFX AllTech n&apos;exerce aucun contrôle sur ces sites tiers et décline toute
                  responsabilité quant à leur contenu, leur accessibilité ou aux pratiques en
                  matière de protection des données personnelles de ces sites.
                </p>
                <p>
                  La mise en place de liens hypertextes vers le site ZFX AllTech nécessite une
                  autorisation écrite préalable. Pour toute demande, veuillez nous contacter à
                  l&apos;adresse : contact@zfx-alltech.fr
                </p>
              </div>
            </section>

            {/* 6. Droit applicable et juridiction */}
            <section className="bg-dark-900/50 border border-dark-800 rounded-2xl p-8 hover:border-dark-700 transition-colors">
              <h2 className="text-3xl font-semibold text-white mb-6 flex items-center gap-3">
                <span className="text-violet-400">06.</span>
                Droit applicable et juridiction
              </h2>
              <div className="space-y-4 text-dark-300 leading-relaxed">
                <p>
                  Les présentes mentions légales sont régies par le droit français. L&apos;utilisation
                  du site est également soumise au respect de la législation française en vigueur.
                </p>
                <p>
                  En cas de litige et à défaut d&apos;accord amiable, le litige sera porté devant
                  les tribunaux français compétents conformément aux règles de droit commun.
                </p>
              </div>
            </section>

            {/* 7. Contact */}
            <section className="bg-dark-900/50 border border-dark-800 rounded-2xl p-8 hover:border-dark-700 transition-colors">
              <h2 className="text-3xl font-semibold text-white mb-6 flex items-center gap-3">
                <span className="text-violet-400">07.</span>
                Contact
              </h2>
              <p className="text-dark-300 mb-6 leading-relaxed">
                Pour toute question concernant ces mentions légales ou pour toute demande
                d&apos;information, vous pouvez nous contacter :
              </p>
              <div className="space-y-3 text-dark-300">
                <div className="flex items-start gap-3">
                  <span className="text-violet-400 mt-1">•</span>
                  <div>
                    <strong className="text-white">Par email :</strong>{' '}
                    <a href="mailto:contact@zfx-alltech.fr" className="text-violet-400 hover:text-violet-300 transition-colors">
                      contact@zfx-alltech.fr
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-violet-400 mt-1">•</span>
                  <div>
                    <strong className="text-white">Par téléphone :</strong>{' '}
                    <a href="tel:+33782251099" className="text-violet-400 hover:text-violet-300 transition-colors">
                      +33 7 82 25 10 99
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Footer note */}
          <div className="mt-12 pt-8 border-t border-dark-800">
            <p className="text-dark-400 text-sm text-center">
              Dernière mise à jour : Janvier 2026
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
