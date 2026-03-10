import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Conditions G\u00e9n\u00e9rales de Vente",
  description:
    "Conditions g\u00e9n\u00e9rales de vente de ZFX AllTech - Prestations de services informatiques.",
};

export default function CGV() {
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
            Conditions G&eacute;n&eacute;rales de Vente
          </h1>
          <p className="mt-2 text-muted">
            Derni&egrave;re mise &agrave; jour : Mars 2026
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-6 py-12">
        <div className="max-w-none">
          {/* 1. Identification */}
          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold text-fg">
              1. Identification du prestataire
            </h2>
            <div className="rounded-xl border border-border bg-card/50 p-6 text-muted">
              <p className="mb-2">
                <strong className="text-fg">Raison sociale :</strong> ZFX
                AllTech
              </p>
              <p className="mb-2">
                <strong className="text-fg">Forme juridique :</strong> SAS
                (Soci&eacute;t&eacute; par Actions Simplifi&eacute;e)
              </p>
              <p className="mb-2">
                <strong className="text-fg">SIRET :</strong> 999 732 340 00016
              </p>
              <p className="mb-2">
                <strong className="text-fg">
                  N&deg; TVA intracommunautaire :
                </strong>{" "}
                FR03999732340
              </p>
              <p className="mb-2">
                <strong className="text-fg">Si&egrave;ge social :</strong> 51
                Rue Gambetta, 95600 Eaubonne, France
              </p>
              <p className="mb-2">
                <strong className="text-fg">Email :</strong>{" "}
                <a
                  href="mailto:ZFX.AllTech@outlook.fr"
                  className="text-hero-primary transition-colors hover:text-hero-secondary"
                >
                  ZFX.AllTech@outlook.fr
                </a>
              </p>
              <p>
                <strong className="text-fg">Pr&eacute;sident :</strong> Luis
                Filipe PINTO SECA
              </p>
            </div>
          </section>

          {/* 2. Objet et champ d'application */}
          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold text-fg">
              2. Objet et champ d&apos;application
            </h2>
            <p className="mb-4 leading-relaxed text-muted">
              Les pr&eacute;sentes Conditions G&eacute;n&eacute;rales de Vente
              (ci-apr&egrave;s &laquo; CGV &raquo;) r&eacute;gissent
              l&apos;ensemble des prestations de services informatiques
              propos&eacute;es par ZFX AllTech &agrave; ses clients
              professionnels et particuliers.
            </p>
            <p className="leading-relaxed text-muted">
              Toute commande de prestation implique l&apos;acceptation
              sans r&eacute;serve des pr&eacute;sentes CGV. Elles
              pr&eacute;valent sur tout autre document du client, sauf
              d&eacute;rogation expresse et &eacute;crite.
            </p>
          </section>

          {/* 3. Services */}
          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold text-fg">
              3. Description des prestations
            </h2>
            <p className="mb-4 leading-relaxed text-muted">
              ZFX AllTech propose les prestations suivantes :
            </p>
            <ul className="list-inside list-disc space-y-2 text-muted">
              <li>
                Conception et d&eacute;veloppement de sites web (vitrines,
                e-commerce, portails)
              </li>
              <li>
                D&eacute;veloppement d&apos;applications mobiles (iOS, Android,
                cross-platform)
              </li>
              <li>
                D&eacute;veloppement de logiciels m&eacute;tier sur mesure (ERP,
                CRM, outils internes)
              </li>
              <li>
                Conception et d&eacute;veloppement d&apos;APIs (REST, GraphQL)
              </li>
              <li>
                Applications web (SaaS, dashboards, portails clients)
              </li>
              <li>
                Automatisation de processus m&eacute;tier et int&eacute;grations
              </li>
              <li>
                Tableaux de bord analytiques et reporting
              </li>
            </ul>
            <p className="mt-4 leading-relaxed text-muted">
              Le d&eacute;tail pr&eacute;cis de chaque prestation est
              d&eacute;fini dans le devis correspondant, qui fait partie
              int&eacute;grante du contrat.
            </p>
          </section>

          {/* 4. Devis et commandes */}
          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold text-fg">
              4. Devis et commandes
            </h2>
            <p className="mb-4 leading-relaxed text-muted">
              Un devis d&eacute;taill&eacute; est &eacute;tabli
              pr&eacute;alablement &agrave; toute prestation. Le devis est
              valable <strong className="text-fg">30 jours</strong> &agrave;
              compter de sa date d&apos;&eacute;mission.
            </p>
            <p className="mb-4 leading-relaxed text-muted">
              La commande est r&eacute;put&eacute;e accept&eacute;e par le
              client &agrave; r&eacute;ception du devis sign&eacute; et du
              versement de l&apos;acompte pr&eacute;vu.
            </p>
            <p className="leading-relaxed text-muted">
              Toute modification du p&eacute;rim&egrave;tre de la prestation
              apr&egrave;s acceptation du devis fera l&apos;objet d&apos;un
              avenant chiffr&eacute; et devra &ecirc;tre accept&eacute;e par les
              deux parties.
            </p>
          </section>

          {/* 5. Prix et paiement */}
          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold text-fg">
              5. Prix et modalit&eacute;s de paiement
            </h2>
            <p className="mb-4 leading-relaxed text-muted">
              Les prix sont indiqu&eacute;s en euros hors taxes (HT) dans les
              devis. La TVA applicable sera ajout&eacute;e au taux en vigueur.
            </p>
            <p className="mb-4 leading-relaxed text-muted">
              Sauf mention contraire dans le devis, les conditions de paiement
              sont les suivantes :
            </p>
            <ul className="list-inside list-disc space-y-2 text-muted">
              <li>
                <strong className="text-fg">30 %</strong> &agrave; la signature
                du devis (acompte)
              </li>
              <li>
                <strong className="text-fg">40 %</strong> &agrave; la livraison
                de la version de recette
              </li>
              <li>
                <strong className="text-fg">30 %</strong> &agrave; la livraison
                finale et validation
              </li>
            </ul>
            <p className="mt-4 leading-relaxed text-muted">
              Les paiements sont accept&eacute;s par virement bancaire. Le
              d&eacute;lai de paiement est de{" "}
              <strong className="text-fg">30 jours</strong> &agrave; compter de
              la date de facturation, sauf accord diff&eacute;rent mentionn&eacute;
              au devis.
            </p>
          </section>

          {/* 6. Retard de paiement */}
          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold text-fg">
              6. Retard de paiement
            </h2>
            <p className="mb-4 leading-relaxed text-muted">
              En cas de retard de paiement, des
              p&eacute;nalit&eacute;s de retard seront
              appliqu&eacute;es de plein droit, sans mise en demeure
              pr&eacute;alable, au taux de{" "}
              <strong className="text-fg">
                3 fois le taux d&apos;int&eacute;r&ecirc;t l&eacute;gal
              </strong>{" "}
              en vigueur.
            </p>
            <p className="mb-4 leading-relaxed text-muted">
              Conform&eacute;ment &agrave; l&apos;article L441-10 du Code de
              Commerce, une{" "}
              <strong className="text-fg">
                indemnit&eacute; forfaitaire de 40 &euro;
              </strong>{" "}
              pour frais de recouvrement sera due de plein droit en cas de retard
              de paiement (clients professionnels).
            </p>
            <p className="leading-relaxed text-muted">
              ZFX AllTech se r&eacute;serve le droit de suspendre toute
              prestation en cours en cas de non-paiement.
            </p>
          </section>

          {/* 7. Exécution et livraison */}
          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold text-fg">
              7. Ex&eacute;cution et livraison
            </h2>
            <p className="mb-4 leading-relaxed text-muted">
              Les d&eacute;lais de livraison sont indiqu&eacute;s dans le devis
              et d&eacute;pendent de la complexit&eacute; de la prestation. Ils
              sont donn&eacute;s &agrave; titre indicatif et ne constituent pas
              un engagement ferme, sauf mention contraire.
            </p>
            <p className="mb-4 leading-relaxed text-muted">
              Le client s&apos;engage &agrave; fournir dans les d&eacute;lais
              convenus tous les &eacute;l&eacute;ments n&eacute;cessaires
              &agrave; la r&eacute;alisation de la prestation (contenus, acc&egrave;s,
              cahier des charges, retours). Tout retard du client pourra
              entra&icirc;ner un d&eacute;calage &eacute;quivalent du
              d&eacute;lai de livraison.
            </p>
          </section>

          {/* 8. Recette */}
          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold text-fg">
              8. Recette et validation
            </h2>
            <p className="mb-4 leading-relaxed text-muted">
              &Agrave; la livraison de chaque &eacute;tape, le client dispose
              d&apos;un d&eacute;lai de{" "}
              <strong className="text-fg">15 jours</strong> pour proc&eacute;der
              &agrave; la recette et signaler d&apos;&eacute;ventuelles
              anomalies par &eacute;crit.
            </p>
            <p className="mb-4 leading-relaxed text-muted">
              Les anomalies signal&eacute;es seront corrig&eacute;es par ZFX
              AllTech dans un d&eacute;lai raisonnable. Seules les anomalies
              relevant d&apos;un &eacute;cart avec le cahier des charges
              valid&eacute; sont prises en charge.
            </p>
            <p className="leading-relaxed text-muted">
              L&apos;absence de retour du client &agrave; l&apos;issue du
              d&eacute;lai de 15 jours vaut acceptation tacite de la livraison.
            </p>
          </section>

          {/* 9. Propriété intellectuelle */}
          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold text-fg">
              9. Propri&eacute;t&eacute; intellectuelle
            </h2>
            <p className="mb-4 leading-relaxed text-muted">
              Le transfert des droits de propri&eacute;t&eacute; intellectuelle
              sur les d&eacute;veloppements r&eacute;alis&eacute;s est
              effectif uniquement apr&egrave;s paiement int&eacute;gral du prix
              convenu.
            </p>
            <p className="mb-4 leading-relaxed text-muted">
              Le client re&ccedil;oit un droit d&apos;utilisation, de
              reproduction et de modification des livrables pour ses propres
              besoins. Les droits transf&eacute;r&eacute;s sont
              pr&eacute;cis&eacute;s dans le devis.
            </p>
            <p className="mb-4 leading-relaxed text-muted">
              ZFX AllTech conserve le droit de r&eacute;utiliser les composants
              g&eacute;n&eacute;riques, frameworks et biblioth&egrave;ques
              d&eacute;velopp&eacute;s dans le cadre de la prestation, ainsi que
              le droit de mentionner la r&eacute;alisation dans son portfolio,
              sauf opposition &eacute;crite du client.
            </p>
            <p className="leading-relaxed text-muted">
              Les composants open source utilis&eacute;s restent soumis &agrave;
              leurs licences respectives.
            </p>
          </section>

          {/* 10. Garanties et responsabilité */}
          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold text-fg">
              10. Garanties et limitation de responsabilit&eacute;
            </h2>
            <p className="mb-4 leading-relaxed text-muted">
              ZFX AllTech garantit la conformit&eacute; des livrables au cahier
              des charges valid&eacute;. Une p&eacute;riode de garantie de{" "}
              <strong className="text-fg">3 mois</strong> apr&egrave;s la
              livraison finale couvre la correction des anomalies de
              conformit&eacute;.
            </p>
            <p className="mb-4 leading-relaxed text-muted">
              La responsabilit&eacute; de ZFX AllTech est limit&eacute;e au
              montant total pay&eacute; par le client pour la prestation
              concern&eacute;e. ZFX AllTech ne pourra en aucun cas &ecirc;tre
              tenue responsable des dommages indirects (perte de chiffre
              d&apos;affaires, perte de donn&eacute;es, manque &agrave; gagner).
            </p>
            <p className="leading-relaxed text-muted">
              ZFX AllTech ne saurait &ecirc;tre tenue responsable en cas de
              force majeure (catastrophe naturelle, panne g&eacute;n&eacute;rale
              d&apos;Internet, conflit arm&eacute;, etc.).
            </p>
          </section>

          {/* 11. Confidentialité */}
          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold text-fg">
              11. Confidentialit&eacute;
            </h2>
            <p className="leading-relaxed text-muted">
              Chaque partie s&apos;engage &agrave; traiter comme confidentielles
              toutes les informations &eacute;chang&eacute;es dans le cadre de
              la prestation. Cette obligation de confidentialit&eacute; perdure
              pendant <strong className="text-fg">3 ans</strong> apr&egrave;s la
              fin de la relation contractuelle, sauf pour les informations
              devenues publiques ou requises par la loi.
            </p>
          </section>

          {/* 12. Données personnelles */}
          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold text-fg">
              12. Donn&eacute;es personnelles
            </h2>
            <p className="mb-4 leading-relaxed text-muted">
              Les donn&eacute;es personnelles collect&eacute;es dans le cadre de
              la relation commerciale sont trait&eacute;es conform&eacute;ment
              &agrave; notre{" "}
              <Link
                href="/politique-confidentialite"
                className="text-hero-primary transition-colors hover:text-hero-secondary"
              >
                Politique de confidentialit&eacute;
              </Link>{" "}
              et au RGPD.
            </p>
            <p className="leading-relaxed text-muted">
              Le client peut exercer ses droits d&apos;acc&egrave;s, de
              rectification, de suppression et de portabilit&eacute; en
              contactant{" "}
              <a
                href="mailto:ZFX.AllTech@outlook.fr"
                className="text-hero-primary transition-colors hover:text-hero-secondary"
              >
                ZFX.AllTech@outlook.fr
              </a>
              .
            </p>
          </section>

          {/* 13. Droit de rétractation */}
          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold text-fg">
              13. Droit de r&eacute;tractation (clients particuliers)
            </h2>
            <p className="mb-4 leading-relaxed text-muted">
              Conform&eacute;ment aux articles L221-18 et suivants du Code de la
              Consommation, le client particulier dispose d&apos;un d&eacute;lai
              de <strong className="text-fg">14 jours</strong> &agrave; compter
              de la conclusion du contrat pour exercer son droit de
              r&eacute;tractation, sans avoir &agrave; justifier de motifs.
            </p>
            <p className="mb-4 leading-relaxed text-muted">
              Toutefois, conform&eacute;ment &agrave; l&apos;article L221-28 du
              Code de la Consommation, si le client demande express&eacute;ment
              le d&eacute;but de l&apos;ex&eacute;cution de la prestation avant
              la fin du d&eacute;lai de r&eacute;tractation, il reconna&icirc;t
              renoncer &agrave; son droit de r&eacute;tractation une fois la
              prestation pleinement ex&eacute;cut&eacute;e.
            </p>
            <p className="leading-relaxed text-muted">
              En cas de r&eacute;tractation avant l&apos;ach&egrave;vement de la
              prestation, le client sera redevable d&apos;un montant
              proportionnel aux travaux d&eacute;j&agrave;
              r&eacute;alis&eacute;s.
            </p>
          </section>

          {/* 14. Résiliation */}
          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold text-fg">
              14. R&eacute;siliation
            </h2>
            <p className="mb-4 leading-relaxed text-muted">
              Chaque partie peut r&eacute;silier le contrat en cas de manquement
              grave de l&apos;autre partie &agrave; ses obligations, apr&egrave;s
              mise en demeure rest&eacute;e infructueuse pendant{" "}
              <strong className="text-fg">15 jours</strong>.
            </p>
            <p className="leading-relaxed text-muted">
              En cas de r&eacute;siliation, les prestations
              d&eacute;j&agrave; r&eacute;alis&eacute;es restent dues. Les
              livrables partiels seront remis au client au prorata du
              paiement effectu&eacute;.
            </p>
          </section>

          {/* 15. Médiation */}
          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold text-fg">
              15. M&eacute;diation (clients particuliers)
            </h2>
            <p className="mb-4 leading-relaxed text-muted">
              Conform&eacute;ment aux articles L612-1 et suivants du Code de la
              Consommation, le client particulier a le droit de recourir
              gratuitement &agrave; un m&eacute;diateur de la consommation en
              cas de litige non r&eacute;solu &agrave; l&apos;amiable.
            </p>
            <p className="leading-relaxed text-muted">
              Plateforme europ&eacute;enne de r&egrave;glement en ligne des
              litiges :{" "}
              <a
                href="https://ec.europa.eu/consumers/odr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-hero-primary transition-colors hover:text-hero-secondary"
              >
                https://ec.europa.eu/consumers/odr
              </a>
            </p>
          </section>

          {/* 16. Hébergement */}
          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold text-fg">
              16. H&eacute;bergement
            </h2>
            <p className="leading-relaxed text-muted">
              Sauf accord contraire, l&apos;h&eacute;bergement des sites et
              applications livr&eacute;s n&apos;est pas inclus dans la
              prestation. ZFX AllTech peut proposer des solutions
              d&apos;h&eacute;bergement en option, dont les conditions seront
              d&eacute;finies dans le devis correspondant.
            </p>
          </section>

          {/* 17. Droit applicable */}
          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold text-fg">
              17. Droit applicable et juridiction
            </h2>
            <p className="mb-4 leading-relaxed text-muted">
              Les pr&eacute;sentes CGV sont r&eacute;gies par le droit
              fran&ccedil;ais.
            </p>
            <p className="leading-relaxed text-muted">
              En cas de litige entre professionnels, et &agrave; d&eacute;faut
              de r&eacute;solution amiable, le Tribunal de Commerce de Pontoise
              sera seul comp&eacute;tent. Pour les litiges avec un client
              particulier, les r&egrave;gles de comp&eacute;tence territoriale
              de droit commun s&apos;appliquent.
            </p>
          </section>

          {/* 18. Dispositions diverses */}
          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold text-fg">
              18. Dispositions diverses
            </h2>
            <p className="mb-4 leading-relaxed text-muted">
              Si l&apos;une des clauses des pr&eacute;sentes CGV est
              d&eacute;clar&eacute;e nulle, les autres clauses restent
              applicables.
            </p>
            <p className="mb-4 leading-relaxed text-muted">
              Le fait de ne pas exercer un droit pr&eacute;vu par les
              pr&eacute;sentes CGV ne constitue pas une renonciation &agrave; ce
              droit.
            </p>
            <p className="leading-relaxed text-muted">
              Les CGV applicables sont celles en vigueur &agrave; la date de la
              commande. ZFX AllTech se r&eacute;serve le droit de les modifier
              &agrave; tout moment.
            </p>
          </section>

          {/* 19. Contact */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-fg">
              19. Contact
            </h2>
            <p className="leading-relaxed text-muted">
              Pour toute question relative aux pr&eacute;sentes CGV, contactez-nous
              &agrave; :{" "}
              <a
                href="mailto:ZFX.AllTech@outlook.fr"
                className="text-hero-primary transition-colors hover:text-hero-secondary"
              >
                ZFX.AllTech@outlook.fr
              </a>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
