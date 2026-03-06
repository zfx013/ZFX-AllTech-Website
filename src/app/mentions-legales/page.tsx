import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Mentions Légales",
  description:
    "Mentions légales du site ZFX AllTech - Informations juridiques et légales.",
};

export default function MentionsLegales() {
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
            Mentions L&eacute;gales
          </h1>
          <p className="mt-2 text-muted">
            Derni&egrave;re mise &agrave; jour : Janvier 2024
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-6 py-12">
        <div className="max-w-none">
          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold text-fg">
              1. &Eacute;diteur du site
            </h2>
            <div className="rounded-xl border border-border bg-card/50 p-6 text-muted">
              <p className="mb-2">
                <strong className="text-fg">Raison sociale :</strong> ZFX
                AllTech
              </p>
              <p className="mb-2">
                <strong className="text-fg">Forme juridique :</strong> SASU
                (Soci&eacute;t&eacute; par Actions Simplifi&eacute;e
                Unipersonnelle)
              </p>
              <p className="mb-2">
                <strong className="text-fg">Si&egrave;ge social :</strong>{" "}
                France
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
                <strong className="text-fg">
                  Directeur de la publication :
                </strong>{" "}
                Le Pr&eacute;sident de ZFX AllTech
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold text-fg">
              2. H&eacute;bergement
            </h2>
            <div className="rounded-xl border border-border bg-card/50 p-6 text-muted">
              <p className="mb-2">
                <strong className="text-fg">H&eacute;bergeur :</strong> Vercel
                Inc.
              </p>
              <p className="mb-2">
                <strong className="text-fg">Adresse :</strong> 340 S Lemon Ave
                #4133, Walnut, CA 91789, USA
              </p>
              <p>
                <strong className="text-fg">Site web :</strong>{" "}
                <a
                  href="https://vercel.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-hero-primary transition-colors hover:text-hero-secondary"
                >
                  vercel.com
                </a>
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold text-fg">
              3. Propri&eacute;t&eacute; intellectuelle
            </h2>
            <p className="mb-4 leading-relaxed text-muted">
              L&apos;ensemble du contenu de ce site (textes, images,
              graphismes, logo, ic&ocirc;nes, sons, logiciels, etc.) est la
              propri&eacute;t&eacute; exclusive de ZFX AllTech ou de ses
              partenaires et est prot&eacute;g&eacute; par les lois
              fran&ccedil;aises et internationales relatives &agrave; la
              propri&eacute;t&eacute; intellectuelle.
            </p>
            <p className="leading-relaxed text-muted">
              Toute reproduction, repr&eacute;sentation, modification,
              publication, adaptation de tout ou partie des
              &eacute;l&eacute;ments du site, quel que soit le moyen ou le
              proc&eacute;d&eacute; utilis&eacute;, est interdite, sauf
              autorisation &eacute;crite pr&eacute;alable de ZFX AllTech.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold text-fg">
              4. Limitation de responsabilit&eacute;
            </h2>
            <p className="mb-4 leading-relaxed text-muted">
              ZFX AllTech s&apos;efforce de fournir sur ce site des informations
              aussi pr&eacute;cises que possible. Toutefois, ZFX AllTech ne
              pourra &ecirc;tre tenue responsable des omissions, des
              inexactitudes et des carences dans la mise &agrave; jour,
              qu&apos;elles soient de son fait ou du fait des tiers partenaires
              qui lui fournissent ces informations.
            </p>
            <p className="leading-relaxed text-muted">
              Toutes les informations pr&eacute;sentes sur le site sont
              donn&eacute;es &agrave; titre indicatif et sont susceptibles
              d&apos;&eacute;voluer. Par ailleurs, les renseignements figurant
              sur le site ne sont pas exhaustifs. Ils sont donn&eacute;s sous
              r&eacute;serve de modifications ayant &eacute;t&eacute;
              apport&eacute;es depuis leur mise en ligne.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold text-fg">
              5. Liens hypertextes
            </h2>
            <p className="leading-relaxed text-muted">
              Le site peut contenir des liens hypertextes vers d&apos;autres
              sites internet. ZFX AllTech n&apos;exerce aucun contr&ocirc;le sur
              ces sites et d&eacute;cline toute responsabilit&eacute; quant
              &agrave; leur contenu ou aux pratiques de confidentialit&eacute;
              de ces sites tiers.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold text-fg">
              6. Cookies
            </h2>
            <p className="leading-relaxed text-muted">
              Ce site peut utiliser des cookies pour am&eacute;liorer
              l&apos;exp&eacute;rience utilisateur. Pour plus
              d&apos;informations sur notre utilisation des cookies, veuillez
              consulter notre{" "}
              <Link
                href="/politique-confidentialite"
                className="text-hero-primary transition-colors hover:text-hero-secondary"
              >
                Politique de confidentialit&eacute;
              </Link>
              .
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold text-fg">
              7. Droit applicable
            </h2>
            <p className="leading-relaxed text-muted">
              Les pr&eacute;sentes mentions l&eacute;gales sont r&eacute;gies
              par le droit fran&ccedil;ais. En cas de litige, et &agrave;
              d&eacute;faut de r&eacute;solution amiable, les tribunaux
              fran&ccedil;ais seront seuls comp&eacute;tents.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-fg">
              8. Contact
            </h2>
            <p className="leading-relaxed text-muted">
              Pour toute question relative aux pr&eacute;sentes mentions
              l&eacute;gales, vous pouvez nous contacter &agrave;
              l&apos;adresse suivante :{" "}
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
