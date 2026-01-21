import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Conditions Générales de Vente',
  description: 'Conditions générales de vente des prestations de développement web et logiciel de ZFX AllTech.',
};

export default function CGV() {
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
              Conditions Générales de Vente
            </h1>
            <p className="text-dark-400 text-lg">
              Conditions applicables aux prestations de services de ZFX AllTech
            </p>
          </div>

          {/* Content */}
          <div className="space-y-10">
            {/* 1. Préambule */}
            <section className="bg-dark-900/50 border border-dark-800 rounded-2xl p-8 hover:border-dark-700 transition-colors">
              <h2 className="text-3xl font-semibold text-white mb-6 flex items-center gap-3">
                <span className="text-violet-400">01.</span>
                Préambule
              </h2>
              <div className="space-y-4 text-dark-300 leading-relaxed">
                <p>
                  Les présentes Conditions Générales de Vente (CGV) régissent les relations
                  contractuelles entre ZFX AllTech (ci-après &quot;le Prestataire&quot;) et ses clients
                  (ci-après &quot;le Client&quot;) dans le cadre de prestations de développement web,
                  développement logiciel, création d&apos;applications et services associés.
                </p>
                <p>
                  Toute commande implique l&apos;acceptation sans réserve des présentes CGV par le Client.
                </p>
              </div>
            </section>

            {/* 2. Services proposés */}
            <section className="bg-dark-900/50 border border-dark-800 rounded-2xl p-8 hover:border-dark-700 transition-colors">
              <h2 className="text-3xl font-semibold text-white mb-6 flex items-center gap-3">
                <span className="text-violet-400">02.</span>
                Services proposés
              </h2>
              <div className="space-y-4 text-dark-300 leading-relaxed">
                <p>ZFX AllTech propose les services suivants :</p>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>Développement de sites web (vitrines, e-commerce, applications web)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>Développement d&apos;applications mobiles (iOS, Android, cross-platform)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>Développement de logiciels métier (ERP, CRM, outils sur mesure)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>Conception et développement d&apos;APIs (REST, GraphQL)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>Conseil technique et audit de code</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>Maintenance et support technique</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* 3. Devis et commande */}
            <section className="bg-dark-900/50 border border-dark-800 rounded-2xl p-8 hover:border-dark-700 transition-colors">
              <h2 className="text-3xl font-semibold text-white mb-6 flex items-center gap-3">
                <span className="text-violet-400">03.</span>
                Devis et commande
              </h2>
              <div className="space-y-4 text-dark-300 leading-relaxed">
                <p>
                  Chaque prestation fait l&apos;objet d&apos;un devis détaillé préalable, gratuit et sans engagement.
                  Le devis est valable 30 jours à compter de sa date d&apos;émission.
                </p>
                <p>
                  La commande est considérée comme ferme et définitive après :
                </p>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>Acceptation écrite du devis par le Client (email ou signature)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>Versement de l&apos;acompte prévu au devis</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* 4. Tarifs et modalités de paiement */}
            <section className="bg-dark-900/50 border border-dark-800 rounded-2xl p-8 hover:border-dark-700 transition-colors">
              <h2 className="text-3xl font-semibold text-white mb-6 flex items-center gap-3">
                <span className="text-violet-400">04.</span>
                Tarifs et modalités de paiement
              </h2>
              <div className="space-y-4 text-dark-300 leading-relaxed">
                <p>
                  Les prix sont exprimés en euros (EUR) hors taxes. La TVA applicable sera ajoutée
                  selon le taux en vigueur.
                </p>
                <p>
                  <strong className="text-white">Modalités de paiement standards :</strong>
                </p>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>30% d&apos;acompte à la commande</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>40% à mi-parcours du projet</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>30% à la livraison finale</span>
                  </li>
                </ul>
                <p>
                  Les paiements s&apos;effectuent par virement bancaire. Les délais de paiement sont de
                  30 jours à compter de la date de facturation.
                </p>
                <p>
                  En cas de retard de paiement, des pénalités de retard au taux de 3 fois le taux
                  d&apos;intérêt légal seront appliquées, ainsi qu&apos;une indemnité forfaitaire de 40 EUR
                  pour frais de recouvrement.
                </p>
              </div>
            </section>

            {/* 5. Délais de réalisation */}
            <section className="bg-dark-900/50 border border-dark-800 rounded-2xl p-8 hover:border-dark-700 transition-colors">
              <h2 className="text-3xl font-semibold text-white mb-6 flex items-center gap-3">
                <span className="text-violet-400">05.</span>
                Délais de réalisation
              </h2>
              <div className="space-y-4 text-dark-300 leading-relaxed">
                <p>
                  Les délais de réalisation sont donnés à titre indicatif et dépendent de la
                  complexité du projet et de la réactivité du Client pour les validations.
                </p>
                <p>
                  Le Prestataire s&apos;engage à respecter au mieux les délais convenus. Tout retard
                  significatif sera communiqué au Client dans les meilleurs délais.
                </p>
                <p>
                  Les délais peuvent être prolongés en cas de :
                </p>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>Retard dans la fourniture des éléments par le Client</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>Modifications du cahier des charges en cours de projet</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>Force majeure</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* 6. Obligations du Client */}
            <section className="bg-dark-900/50 border border-dark-800 rounded-2xl p-8 hover:border-dark-700 transition-colors">
              <h2 className="text-3xl font-semibold text-white mb-6 flex items-center gap-3">
                <span className="text-violet-400">06.</span>
                Obligations du Client
              </h2>
              <div className="space-y-4 text-dark-300 leading-relaxed">
                <p>Le Client s&apos;engage à :</p>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>Fournir les éléments nécessaires à la réalisation du projet (contenus, images, accès...)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>Valider les étapes du projet dans les délais convenus</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>Désigner un interlocuteur unique pour le suivi du projet</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>Respecter les délais de paiement</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* 7. Propriété intellectuelle */}
            <section className="bg-dark-900/50 border border-dark-800 rounded-2xl p-8 hover:border-dark-700 transition-colors">
              <h2 className="text-3xl font-semibold text-white mb-6 flex items-center gap-3">
                <span className="text-violet-400">07.</span>
                Propriété intellectuelle
              </h2>
              <div className="space-y-4 text-dark-300 leading-relaxed">
                <p>
                  Une fois le paiement intégral effectué, le Client devient propriétaire des
                  livrables développés spécifiquement pour lui (code source, designs, etc.).
                </p>
                <p>
                  Le Prestataire conserve la propriété intellectuelle de :
                </p>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>Ses outils, méthodes et savoir-faire préexistants</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>Les composants génériques développés et réutilisables</span>
                  </li>
                </ul>
                <p>
                  Le Prestataire se réserve le droit de mentionner le projet dans son portfolio,
                  sauf accord contraire explicite du Client.
                </p>
              </div>
            </section>

            {/* 8. Garantie et responsabilité */}
            <section className="bg-dark-900/50 border border-dark-800 rounded-2xl p-8 hover:border-dark-700 transition-colors">
              <h2 className="text-3xl font-semibold text-white mb-6 flex items-center gap-3">
                <span className="text-violet-400">08.</span>
                Garantie et responsabilité
              </h2>
              <div className="space-y-4 text-dark-300 leading-relaxed">
                <p>
                  Le Prestataire s&apos;engage à fournir des prestations conformes au cahier des charges
                  validé. Une garantie de correction des anomalies de 30 jours est incluse après
                  la livraison.
                </p>
                <p>
                  La responsabilité du Prestataire est limitée au montant de la prestation.
                  Le Prestataire ne pourra être tenu responsable des dommages indirects
                  (perte de chiffre d&apos;affaires, perte de données, etc.).
                </p>
              </div>
            </section>

            {/* 9. Résiliation */}
            <section className="bg-dark-900/50 border border-dark-800 rounded-2xl p-8 hover:border-dark-700 transition-colors">
              <h2 className="text-3xl font-semibold text-white mb-6 flex items-center gap-3">
                <span className="text-violet-400">09.</span>
                Résiliation
              </h2>
              <div className="space-y-4 text-dark-300 leading-relaxed">
                <p>
                  En cas de résiliation du contrat par le Client avant la fin du projet :
                </p>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>Les sommes versées restent acquises au Prestataire</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>Les travaux réalisés restent dus</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>Le Client recevra les livrables correspondant aux travaux payés</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* 10. Confidentialité */}
            <section className="bg-dark-900/50 border border-dark-800 rounded-2xl p-8 hover:border-dark-700 transition-colors">
              <h2 className="text-3xl font-semibold text-white mb-6 flex items-center gap-3">
                <span className="text-violet-400">10.</span>
                Confidentialité
              </h2>
              <div className="space-y-4 text-dark-300 leading-relaxed">
                <p>
                  Les parties s&apos;engagent à garder confidentielles toutes les informations
                  échangées dans le cadre du projet, pendant et après l&apos;exécution du contrat.
                </p>
              </div>
            </section>

            {/* 11. Droit applicable */}
            <section className="bg-dark-900/50 border border-dark-800 rounded-2xl p-8 hover:border-dark-700 transition-colors">
              <h2 className="text-3xl font-semibold text-white mb-6 flex items-center gap-3">
                <span className="text-violet-400">11.</span>
                Droit applicable et litiges
              </h2>
              <div className="space-y-4 text-dark-300 leading-relaxed">
                <p>
                  Les présentes CGV sont soumises au droit français. En cas de litige,
                  les parties s&apos;efforceront de trouver une solution amiable.
                </p>
                <p>
                  À défaut, le litige sera porté devant les tribunaux compétents du
                  ressort du siège social du Prestataire.
                </p>
              </div>
            </section>

            {/* 12. Contact */}
            <section className="bg-dark-900/50 border border-dark-800 rounded-2xl p-8 hover:border-dark-700 transition-colors">
              <h2 className="text-3xl font-semibold text-white mb-6 flex items-center gap-3">
                <span className="text-violet-400">12.</span>
                Contact
              </h2>
              <p className="text-dark-300 mb-6 leading-relaxed">
                Pour toute question concernant ces CGV, contactez-nous :
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
