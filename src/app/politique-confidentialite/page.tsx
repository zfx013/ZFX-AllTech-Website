import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Politique de Confidentialité",
  description:
    "Politique de confidentialité de ZFX AllTech - Protection de vos données personnelles.",
};

export default function PolitiqueConfidentialite() {
  return (
    <main className="min-h-screen bg-bg">
      {/* Header */}
      <div className="border-b border-border">
        <div className="mx-auto max-w-4xl px-6 py-8">
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-2 text-muted transition-colors hover:text-fg"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour &agrave; l&apos;accueil
          </Link>
          <h1 className="text-3xl font-bold text-fg sm:text-4xl">
            Politique de Confidentialit&eacute;
          </h1>
          <p className="mt-2 text-muted">
            Derni&egrave;re mise &agrave; jour : Mars 2026
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-6 py-12">
        <div className="max-w-none">
          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold text-fg">
              1. Introduction
            </h2>
            <p className="leading-relaxed text-muted">
              ZFX AllTech (ci-apr&egrave;s &laquo; nous &raquo;, &laquo; notre
              &raquo; ou &laquo; nos &raquo;) s&apos;engage &agrave;
              prot&eacute;ger la vie priv&eacute;e des utilisateurs de son site
              web (ci-apr&egrave;s &laquo; vous &raquo; ou &laquo; votre
              &raquo;). Cette politique de confidentialit&eacute; explique
              comment nous collectons, utilisons, stockons et prot&eacute;geons
              vos informations personnelles conform&eacute;ment au
              R&egrave;glement G&eacute;n&eacute;ral sur la Protection des
              Donn&eacute;es (RGPD).
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold text-fg">
              2. Responsable du traitement
            </h2>
            <div className="rounded-xl border border-border bg-card/50 p-6 text-muted">
              <p className="mb-2">
                <strong className="text-fg">Responsable :</strong> ZFX AllTech
                (SAS)
              </p>
              <p className="mb-2">
                <strong className="text-fg">SIRET :</strong> 999 732 340 00016
              </p>
              <p className="mb-2">
                <strong className="text-fg">Si&egrave;ge social :</strong>{" "}
                51 Rue Gambetta, 95600 Eaubonne, France
              </p>
              <p>
                <strong className="text-fg">Contact :</strong>{" "}
                <a
                  href="mailto:ZFX.AllTech@outlook.fr"
                  className="text-hero-primary transition-colors hover:text-hero-secondary"
                >
                  ZFX.AllTech@outlook.fr
                </a>
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold text-fg">
              3. Donn&eacute;es collect&eacute;es
            </h2>
            <p className="mb-4 leading-relaxed text-muted">
              Nous pouvons collecter les types de donn&eacute;es suivants :
            </p>
            <div className="rounded-xl border border-border bg-card/50 p-6 text-muted">
              <h3 className="mb-3 text-lg font-medium text-fg">
                Donn&eacute;es fournies directement :
              </h3>
              <ul className="mb-6 list-inside list-disc space-y-2">
                <li>Nom et pr&eacute;nom</li>
                <li>Adresse email</li>
                <li>Nom de l&apos;entreprise (optionnel)</li>
                <li>
                  Contenu des messages envoy&eacute;s via le formulaire de
                  contact
                </li>
              </ul>

              <p className="text-sm italic">
                Aucune donn&eacute;e n&apos;est collect&eacute;e
                automatiquement. Ce site n&apos;utilise ni cookies, ni
                traceurs, ni outils d&apos;analyse.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold text-fg">
              4. Finalit&eacute;s du traitement
            </h2>
            <p className="mb-4 leading-relaxed text-muted">
              Vos donn&eacute;es personnelles sont utilis&eacute;es pour :
            </p>
            <ul className="list-inside list-disc space-y-2 text-muted">
              <li>
                R&eacute;pondre &agrave; vos demandes de contact et de devis
              </li>
              <li>Vous fournir des informations sur nos services</li>
              <li>Am&eacute;liorer notre site web et nos services</li>
              <li>Respecter nos obligations l&eacute;gales</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold text-fg">
              5. Base l&eacute;gale du traitement
            </h2>
            <p className="leading-relaxed text-muted">
              Le traitement de vos donn&eacute;es personnelles est fond&eacute;
              sur :
            </p>
            <ul className="mt-4 list-inside list-disc space-y-2 text-muted">
              <li>
                <strong className="text-fg">Votre consentement :</strong>{" "}
                lorsque vous remplissez notre formulaire de contact
              </li>
              <li>
                <strong className="text-fg">
                  L&apos;ex&eacute;cution d&apos;un contrat :
                </strong>{" "}
                pour la gestion de la relation commerciale
              </li>
              <li>
                <strong className="text-fg">
                  Notre int&eacute;r&ecirc;t l&eacute;gitime :
                </strong>{" "}
                pour am&eacute;liorer nos services et assurer la
                s&eacute;curit&eacute; du site
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold text-fg">
              6. Dur&eacute;e de conservation
            </h2>
            <p className="leading-relaxed text-muted">
              Vos donn&eacute;es personnelles sont conserv&eacute;es pendant une
              dur&eacute;e limit&eacute;e :
            </p>
            <ul className="mt-4 list-inside list-disc space-y-2 text-muted">
              <li>
                Donn&eacute;es de contact : 3 ans apr&egrave;s le dernier
                contact
              </li>
              <li>
                Donn&eacute;es contractuelles : dur&eacute;e l&eacute;gale de
                conservation (10 ans)
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold text-fg">
              7. Partage des donn&eacute;es
            </h2>
            <p className="mb-4 leading-relaxed text-muted">
              Nous ne vendons ni ne louons vos donn&eacute;es personnelles
              &agrave; des tiers. Vos donn&eacute;es peuvent &ecirc;tre
              partag&eacute;es avec :
            </p>
            <ul className="list-inside list-disc space-y-2 text-muted">
              <li>Nos prestataires techniques (h&eacute;bergement, email)</li>
              <li>
                Les autorit&eacute;s comp&eacute;tentes en cas
                d&apos;obligation l&eacute;gale
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold text-fg">
              8. Cookies
            </h2>
            <p className="leading-relaxed text-muted">
              Ce site n&apos;utilise aucun cookie ni aucun traceur.
              Aucune donn&eacute;e de navigation n&apos;est collect&eacute;e
              automatiquement. Aucune bannière de consentement n&apos;est
              n&eacute;cessaire.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold text-fg">
              9. Vos droits
            </h2>
            <p className="mb-4 leading-relaxed text-muted">
              Conform&eacute;ment au RGPD, vous disposez des droits suivants :
            </p>
            <div className="rounded-xl border border-border bg-card/50 p-6 text-muted">
              <ul className="space-y-3">
                <li>
                  <strong className="text-fg">
                    Droit d&apos;acc&egrave;s :
                  </strong>{" "}
                  obtenir une copie de vos donn&eacute;es
                </li>
                <li>
                  <strong className="text-fg">
                    Droit de rectification :
                  </strong>{" "}
                  corriger vos donn&eacute;es inexactes
                </li>
                <li>
                  <strong className="text-fg">
                    Droit &agrave; l&apos;effacement :
                  </strong>{" "}
                  demander la suppression de vos donn&eacute;es
                </li>
                <li>
                  <strong className="text-fg">
                    Droit &agrave; la limitation :
                  </strong>{" "}
                  limiter le traitement de vos donn&eacute;es
                </li>
                <li>
                  <strong className="text-fg">
                    Droit &agrave; la portabilit&eacute; :
                  </strong>{" "}
                  recevoir vos donn&eacute;es dans un format structur&eacute;
                </li>
                <li>
                  <strong className="text-fg">
                    Droit d&apos;opposition :
                  </strong>{" "}
                  vous opposer au traitement de vos donn&eacute;es
                </li>
              </ul>
            </div>
            <p className="mt-4 leading-relaxed text-muted">
              Pour exercer ces droits, contactez-nous &agrave; :{" "}
              <a
                href="mailto:ZFX.AllTech@outlook.fr"
                className="text-hero-primary transition-colors hover:text-hero-secondary"
              >
                ZFX.AllTech@outlook.fr
              </a>
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold text-fg">
              10. S&eacute;curit&eacute;
            </h2>
            <p className="leading-relaxed text-muted">
              Nous mettons en &oelig;uvre des mesures de s&eacute;curit&eacute;
              techniques et organisationnelles appropri&eacute;es pour
              prot&eacute;ger vos donn&eacute;es personnelles contre la perte,
              l&apos;utilisation abusive, l&apos;acc&egrave;s non
              autoris&eacute;, la divulgation, l&apos;alt&eacute;ration ou la
              destruction.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold text-fg">
              11. Modifications
            </h2>
            <p className="leading-relaxed text-muted">
              Nous nous r&eacute;servons le droit de modifier cette politique de
              confidentialit&eacute; &agrave; tout moment. Les modifications
              seront publi&eacute;es sur cette page avec une date de mise
              &agrave; jour. Nous vous encourageons &agrave; consulter
              r&eacute;guli&egrave;rement cette page.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-fg">
              12. Contact et r&eacute;clamations
            </h2>
            <p className="mb-4 leading-relaxed text-muted">
              Pour toute question concernant cette politique ou pour exercer vos
              droits, contactez-nous &agrave; :{" "}
              <a
                href="mailto:ZFX.AllTech@outlook.fr"
                className="text-hero-primary transition-colors hover:text-hero-secondary"
              >
                ZFX.AllTech@outlook.fr
              </a>
            </p>
            <p className="leading-relaxed text-muted">
              Vous avez &eacute;galement le droit d&apos;introduire une
              r&eacute;clamation aupr&egrave;s de la CNIL (Commission Nationale
              de l&apos;Informatique et des Libert&eacute;s) :{" "}
              <a
                href="https://www.cnil.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-hero-primary transition-colors hover:text-hero-secondary"
              >
                www.cnil.fr
              </a>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
