import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Shield, Lock, Eye, Clock, UserCheck, Cookie, Server, FileText, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Politique de Confidentialité',
  description: 'Politique de confidentialité du site ZFX AllTech - Protection de vos données personnelles conforme au RGPD.',
};

export default function PolitiqueConfidentialite() {
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
            <div className="inline-flex items-center gap-3 mb-4 px-4 py-2 bg-violet-500/10 border border-violet-500/20 rounded-full">
              <Shield className="w-5 h-5 text-violet-400" />
              <span className="text-violet-400 font-medium">RGPD Compliant</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4 gradient-text">
              Politique de Confidentialité
            </h1>
            <p className="text-dark-400 text-lg">
              Protection et respect de vos données personnelles
            </p>
            <p className="text-dark-500 text-sm mt-2">
              Dernière mise à jour : Janvier 2026
            </p>
          </div>

          {/* Content */}
          <div className="space-y-10">
            {/* 1. Introduction */}
            <section className="bg-dark-900/50 border border-dark-800 rounded-2xl p-8 hover:border-dark-700 transition-colors">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-violet-500/10 rounded-xl">
                  <FileText className="w-6 h-6 text-violet-400" />
                </div>
                <div>
                  <h2 className="text-3xl font-semibold text-white mb-2 flex items-center gap-3">
                    <span className="text-violet-400">01.</span>
                    Introduction
                  </h2>
                </div>
              </div>
              <div className="space-y-4 text-dark-300 leading-relaxed">
                <p>
                  ZFX AllTech (ci-après désigné par &quot;nous&quot;, &quot;notre&quot;, &quot;nos&quot;)
                  s&apos;engage à proteger et respecter votre vie privée. Cette politique de confidentialité
                  explique comment nous collectons, utilisons, partageons et protégeons vos données
                  personnelles lorsque vous utilisez notre site web.
                </p>
                <p>
                  Cette politique s&apos;applique à tous les utilisateurs de notre site et est conforme
                  au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique
                  et Libertés du 6 janvier 1978 modifiée.
                </p>
              </div>
            </section>

            {/* 2. Données collectées */}
            <section className="bg-dark-900/50 border border-dark-800 rounded-2xl p-8 hover:border-dark-700 transition-colors">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-emerald-500/10 rounded-xl">
                  <Eye className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h2 className="text-3xl font-semibold text-white mb-2 flex items-center gap-3">
                    <span className="text-violet-400">02.</span>
                    Données collectées
                  </h2>
                </div>
              </div>
              <p className="text-dark-300 mb-6 leading-relaxed">
                Nous collectons uniquement les données strictement nécessaires au fonctionnement
                de notre site et à la fourniture de nos services :
              </p>
              <div className="space-y-4">
                <div className="bg-dark-900/80 border border-dark-700 rounded-xl p-5">
                  <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 bg-violet-400 rounded-full"></span>
                    Données d&apos;identification
                  </h3>
                  <p className="text-dark-300 text-sm">
                    Nom, prénom, adresse email collectés via le formulaire de contact.
                    Ces données sont fournies volontairement par vous.
                  </p>
                </div>
                <div className="bg-dark-900/80 border border-dark-700 rounded-xl p-5">
                  <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 bg-violet-400 rounded-full"></span>
                    Données de navigation
                  </h3>
                  <p className="text-dark-300 text-sm">
                    Adresse IP, type et version du navigateur, système d&apos;exploitation,
                    pages visitées, durée de visite, données de référence collectées
                    automatiquement lors de votre navigation.
                  </p>
                </div>
                <div className="bg-dark-900/80 border border-dark-700 rounded-xl p-5">
                  <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 bg-violet-400 rounded-full"></span>
                    Données de communication
                  </h3>
                  <p className="text-dark-300 text-sm">
                    Contenu des messages, demandes et échanges effectués via notre
                    formulaire de contact ou par email.
                  </p>
                </div>
              </div>
            </section>

            {/* 3. Utilisation des données */}
            <section className="bg-dark-900/50 border border-dark-800 rounded-2xl p-8 hover:border-dark-700 transition-colors">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-violet-500/10 rounded-xl">
                  <UserCheck className="w-6 h-6 text-violet-400" />
                </div>
                <div>
                  <h2 className="text-3xl font-semibold text-white mb-2 flex items-center gap-3">
                    <span className="text-violet-400">03.</span>
                    Utilisation des données
                  </h2>
                </div>
              </div>
              <p className="text-dark-300 mb-6 leading-relaxed">
                Vos données personnelles sont utilisées exclusivement pour les finalités suivantes :
              </p>
              <div className="grid gap-3">
                <div className="flex items-start gap-3 text-dark-300">
                  <span className="text-violet-400 mt-1">•</span>
                  <p>Répondre à vos demandes de contact et de renseignements</p>
                </div>
                <div className="flex items-start gap-3 text-dark-300">
                  <span className="text-violet-400 mt-1">•</span>
                  <p>Vous envoyer des informations relatives à nos services (uniquement avec votre consentement préalable)</p>
                </div>
                <div className="flex items-start gap-3 text-dark-300">
                  <span className="text-violet-400 mt-1">•</span>
                  <p>Améliorer et optimiser notre site web et nos services</p>
                </div>
                <div className="flex items-start gap-3 text-dark-300">
                  <span className="text-violet-400 mt-1">•</span>
                  <p>Analyser l&apos;utilisation de notre site de façon anonyme et agrégée</p>
                </div>
                <div className="flex items-start gap-3 text-dark-300">
                  <span className="text-violet-400 mt-1">•</span>
                  <p>Assurer la sécurité de notre site et prévenir les fraudes</p>
                </div>
                <div className="flex items-start gap-3 text-dark-300">
                  <span className="text-violet-400 mt-1">•</span>
                  <p>Respecter nos obligations légales et réglementaires</p>
                </div>
              </div>
            </section>

            {/* 4. Base légale du traitement */}
            <section className="bg-dark-900/50 border border-dark-800 rounded-2xl p-8 hover:border-dark-700 transition-colors">
              <h2 className="text-3xl font-semibold text-white mb-6 flex items-center gap-3">
                <span className="text-violet-400">04.</span>
                Base légale du traitement
              </h2>
              <p className="text-dark-300 mb-6 leading-relaxed">
                Conformément au RGPD, le traitement de vos données personnelles repose sur :
              </p>
              <div className="space-y-4">
                <div className="bg-dark-900/80 border border-dark-700 rounded-xl p-5">
                  <h3 className="text-white font-semibold mb-2">Votre consentement</h3>
                  <p className="text-dark-300 text-sm">
                    Pour le traitement des données du formulaire de contact et l&apos;envoi
                    de communications marketing (avec opt-in explicite).
                  </p>
                </div>
                <div className="bg-dark-900/80 border border-dark-700 rounded-xl p-5">
                  <h3 className="text-white font-semibold mb-2">Notre intérêt légitime</h3>
                  <p className="text-dark-300 text-sm">
                    Pour l&apos;amélioration de nos services, la sécurité du site et
                    l&apos;analyse statistique anonymisée.
                  </p>
                </div>
                <div className="bg-dark-900/80 border border-dark-700 rounded-xl p-5">
                  <h3 className="text-white font-semibold mb-2">L&apos;exécution d&apos;un contrat</h3>
                  <p className="text-dark-300 text-sm">
                    Pour la fourniture de prestations de services et le suivi de la relation client.
                  </p>
                </div>
                <div className="bg-dark-900/80 border border-dark-700 rounded-xl p-5">
                  <h3 className="text-white font-semibold mb-2">Obligations légales</h3>
                  <p className="text-dark-300 text-sm">
                    Pour le respect des obligations comptables, fiscales et légales.
                  </p>
                </div>
              </div>
            </section>

            {/* 5. Durée de conservation */}
            <section className="bg-dark-900/50 border border-dark-800 rounded-2xl p-8 hover:border-dark-700 transition-colors">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-emerald-500/10 rounded-xl">
                  <Clock className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h2 className="text-3xl font-semibold text-white mb-2 flex items-center gap-3">
                    <span className="text-violet-400">05.</span>
                    Durée de conservation
                  </h2>
                </div>
              </div>
              <p className="text-dark-300 mb-6 leading-relaxed">
                Nous conservons vos données personnelles uniquement pendant la durée nécessaire
                aux finalités pour lesquelles elles ont été collectées :
              </p>
              <div className="bg-dark-900/80 border border-dark-700 rounded-xl overflow-hidden">
                <div className="divide-y divide-dark-700">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 gap-3">
                    <span className="text-white font-medium">Données de contact</span>
                    <span className="text-emerald-400 font-mono text-sm">3 ans après le dernier échange</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 gap-3">
                    <span className="text-white font-medium">Données analytiques</span>
                    <span className="text-emerald-400 font-mono text-sm">13 mois maximum</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 gap-3">
                    <span className="text-white font-medium">Données contractuelles</span>
                    <span className="text-emerald-400 font-mono text-sm">5 ans après la fin du contrat</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 gap-3">
                    <span className="text-white font-medium">Données comptables</span>
                    <span className="text-emerald-400 font-mono text-sm">10 ans (obligation légale)</span>
                  </div>
                </div>
              </div>
              <p className="text-dark-400 text-sm mt-4">
                À l&apos;issue de ces périodes, vos données sont automatiquement supprimées ou anonymisées.
              </p>
            </section>

            {/* 6. Vos droits RGPD */}
            <section className="bg-dark-900/50 border border-dark-800 rounded-2xl p-8 hover:border-dark-700 transition-colors">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-violet-500/10 rounded-xl">
                  <Shield className="w-6 h-6 text-violet-400" />
                </div>
                <div>
                  <h2 className="text-3xl font-semibold text-white mb-2 flex items-center gap-3">
                    <span className="text-violet-400">06.</span>
                    Vos droits (RGPD)
                  </h2>
                </div>
              </div>
              <p className="text-dark-300 mb-6 leading-relaxed">
                Conformément au Règlement Général sur la Protection des Données (RGPD),
                vous disposez des droits suivants concernant vos données personnelles :
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-dark-900/80 border border-dark-700 rounded-xl p-5">
                  <h3 className="text-white font-semibold mb-2">Droit d&apos;accès</h3>
                  <p className="text-dark-300 text-sm">
                    Obtenir une copie de toutes vos données personnelles que nous détenons.
                  </p>
                </div>
                <div className="bg-dark-900/80 border border-dark-700 rounded-xl p-5">
                  <h3 className="text-white font-semibold mb-2">Droit de rectification</h3>
                  <p className="text-dark-300 text-sm">
                    Corriger ou mettre à jour vos données inexactes ou incomplètes.
                  </p>
                </div>
                <div className="bg-dark-900/80 border border-dark-700 rounded-xl p-5">
                  <h3 className="text-white font-semibold mb-2">Droit à l&apos;effacement</h3>
                  <p className="text-dark-300 text-sm">
                    Demander la suppression de vos données personnelles (&quot;droit à l&apos;oubli&quot;).
                  </p>
                </div>
                <div className="bg-dark-900/80 border border-dark-700 rounded-xl p-5">
                  <h3 className="text-white font-semibold mb-2">Droit à la portabilité</h3>
                  <p className="text-dark-300 text-sm">
                    Recevoir vos données dans un format structuré et couramment utilisé.
                  </p>
                </div>
                <div className="bg-dark-900/80 border border-dark-700 rounded-xl p-5">
                  <h3 className="text-white font-semibold mb-2">Droit d&apos;opposition</h3>
                  <p className="text-dark-300 text-sm">
                    Vous opposer au traitement de vos données à tout moment.
                  </p>
                </div>
                <div className="bg-dark-900/80 border border-dark-700 rounded-xl p-5">
                  <h3 className="text-white font-semibold mb-2">Droit à la limitation</h3>
                  <p className="text-dark-300 text-sm">
                    Limiter le traitement de vos données dans certaines circonstances.
                  </p>
                </div>
              </div>
              <div className="mt-6 p-5 bg-violet-500/5 border border-violet-500/20 rounded-xl">
                <p className="text-dark-300 text-sm">
                  <strong className="text-white">Pour exercer ces droits :</strong> Contactez-nous à{' '}
                  <a href="mailto:contact@zfx-alltech.fr" className="text-violet-400 hover:text-violet-300 transition-colors">
                    contact@zfx-alltech.fr
                  </a>
                  {' '}avec une copie de votre pièce d&apos;identité. Nous vous répondrons dans un délai d&apos;un mois.
                </p>
              </div>
            </section>

            {/* 7. Cookies */}
            <section className="bg-dark-900/50 border border-dark-800 rounded-2xl p-8 hover:border-dark-700 transition-colors">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-emerald-500/10 rounded-xl">
                  <Cookie className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h2 className="text-3xl font-semibold text-white mb-2 flex items-center gap-3">
                    <span className="text-violet-400">07.</span>
                    Cookies et technologies similaires
                  </h2>
                </div>
              </div>
              <p className="text-dark-300 mb-6 leading-relaxed">
                Notre site utilise des cookies pour améliorer votre expérience de navigation
                et analyser l&apos;utilisation du site :
              </p>
              <div className="space-y-4">
                <div className="bg-dark-900/80 border border-dark-700 rounded-xl p-5">
                  <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                    <span className="text-emerald-400">✓</span>
                    Cookies strictement nécessaires
                  </h3>
                  <p className="text-dark-300 text-sm">
                    Indispensables au fonctionnement du site (navigation, sécurité).
                    Ces cookies ne nécessitent pas votre consentement.
                  </p>
                </div>
                <div className="bg-dark-900/80 border border-dark-700 rounded-xl p-5">
                  <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                    <span className="text-violet-400">◉</span>
                    Cookies analytiques
                  </h3>
                  <p className="text-dark-300 text-sm">
                    Permettent de mesurer l&apos;audience et analyser la navigation de manière
                    anonymisée. Ces cookies nécessitent votre consentement.
                  </p>
                </div>
              </div>
              <div className="mt-6 p-5 bg-dark-900/80 border border-dark-700 rounded-xl">
                <p className="text-dark-300 text-sm mb-3">
                  <strong className="text-white">Gestion des cookies :</strong>
                </p>
                <p className="text-dark-300 text-sm">
                  Vous pouvez à tout moment configurer votre navigateur pour refuser les cookies
                  ou être averti de leur dépôt. Consultez l&apos;aide de votre navigateur pour
                  plus d&apos;informations sur la gestion des cookies.
                </p>
              </div>
            </section>

            {/* 8. Sécurité */}
            <section className="bg-dark-900/50 border border-dark-800 rounded-2xl p-8 hover:border-dark-700 transition-colors">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-violet-500/10 rounded-xl">
                  <Lock className="w-6 h-6 text-violet-400" />
                </div>
                <div>
                  <h2 className="text-3xl font-semibold text-white mb-2 flex items-center gap-3">
                    <span className="text-violet-400">08.</span>
                    Sécurité des données
                  </h2>
                </div>
              </div>
              <div className="space-y-4 text-dark-300 leading-relaxed">
                <p>
                  Nous mettons en œuvre des mesures techniques et organisationnelles appropriées
                  pour protéger vos données personnelles contre la destruction accidentelle ou
                  illicite, la perte, l&apos;altération, la divulgation ou l&apos;accès non autorisés.
                </p>
                <div className="bg-dark-900/80 border border-dark-700 rounded-xl p-5">
                  <h3 className="text-white font-semibold mb-3">Mesures de sécurité mises en place :</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <span className="text-emerald-400 mt-1">✓</span>
                      <p>Protocole HTTPS pour sécuriser tous les échanges de données</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-emerald-400 mt-1">✓</span>
                      <p>Chiffrement des données sensibles en base de données</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-emerald-400 mt-1">✓</span>
                      <p>Accès restreint aux données personnelles (principe du moindre privilège)</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-emerald-400 mt-1">✓</span>
                      <p>Sauvegardes régulières et sécurisées</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-emerald-400 mt-1">✓</span>
                      <p>Surveillance et détection des incidents de sécurité</p>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-dark-400">
                  En cas de violation de données susceptible d&apos;engendrer un risque élevé pour
                  vos droits et libertés, nous vous en informerons dans les meilleurs délais
                  conformément au RGPD.
                </p>
              </div>
            </section>

            {/* 9. Transfert de données */}
            <section className="bg-dark-900/50 border border-dark-800 rounded-2xl p-8 hover:border-dark-700 transition-colors">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-emerald-500/10 rounded-xl">
                  <Server className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h2 className="text-3xl font-semibold text-white mb-2 flex items-center gap-3">
                    <span className="text-violet-400">09.</span>
                    Transfert de données
                  </h2>
                </div>
              </div>
              <div className="space-y-4 text-dark-300 leading-relaxed">
                <p>
                  Vos données peuvent être transférées et stockées sur des serveurs situés
                  en dehors de l&apos;Union Européenne, notamment pour l&apos;hébergement de notre
                  site (Vercel Inc., États-Unis).
                </p>
                <div className="bg-dark-900/80 border border-dark-700 rounded-xl p-5">
                  <h3 className="text-white font-semibold mb-2">Garanties appropriées :</h3>
                  <p className="text-sm">
                    Ces transferts sont encadrés par des garanties appropriées conformément
                    au RGPD, notamment les Clauses Contractuelles Types approuvées par la
                    Commission Européenne, assurant un niveau de protection adéquat de vos
                    données personnelles.
                  </p>
                </div>
                <p className="text-sm">
                  Nous ne vendons, ne louons ni ne partageons vos données personnelles avec
                  des tiers à des fins commerciales sans votre consentement explicite.
                </p>
              </div>
            </section>

            {/* 10. Modifications */}
            <section className="bg-dark-900/50 border border-dark-800 rounded-2xl p-8 hover:border-dark-700 transition-colors">
              <h2 className="text-3xl font-semibold text-white mb-6 flex items-center gap-3">
                <span className="text-violet-400">10.</span>
                Modifications de la politique
              </h2>
              <div className="space-y-4 text-dark-300 leading-relaxed">
                <p>
                  Nous nous réservons le droit de modifier cette politique de confidentialité
                  à tout moment afin de refléter les évolutions de nos pratiques, de notre
                  site ou des exigences légales.
                </p>
                <p>
                  Toute modification sera publiée sur cette page avec une mise à jour de la
                  date de dernière révision. Pour les changements substantiels, nous vous
                  informerons par email ou via un avis visible sur notre site.
                </p>
                <p className="text-sm text-dark-400">
                  Nous vous encourageons à consulter régulièrement cette page pour rester
                  informé de nos pratiques en matière de protection des données.
                </p>
              </div>
            </section>

            {/* 11. Contact et réclamations */}
            <section className="bg-gradient-to-br from-violet-500/10 to-emerald-500/10 border border-violet-500/20 rounded-2xl p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-violet-500/20 rounded-xl">
                  <Mail className="w-6 h-6 text-violet-300" />
                </div>
                <div>
                  <h2 className="text-3xl font-semibold text-white mb-2 flex items-center gap-3">
                    <span className="text-violet-400">11.</span>
                    Contact et réclamations
                  </h2>
                </div>
              </div>
              <p className="text-dark-300 mb-6 leading-relaxed">
                Pour toute question concernant cette politique de confidentialité, pour exercer
                vos droits ou pour toute réclamation relative à la protection de vos données :
              </p>
              <div className="bg-dark-900/50 border border-dark-700 rounded-xl p-6 mb-6">
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <strong className="text-white min-w-[140px]">Email :</strong>
                    <a href="mailto:contact@zfx-alltech.fr" className="text-violet-400 hover:text-violet-300 transition-colors">
                      contact@zfx-alltech.fr
                    </a>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <strong className="text-white min-w-[140px]">Téléphone :</strong>
                    <a href="tel:+33782251099" className="text-violet-400 hover:text-violet-300 transition-colors">
                      07 82 25 10 99
                    </a>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-start gap-2">
                    <strong className="text-white min-w-[140px]">Délai de réponse :</strong>
                    <span className="text-dark-300">Sous 1 mois maximum</span>
                  </div>
                </div>
              </div>
              <div className="bg-dark-900/50 border border-emerald-500/20 rounded-xl p-6">
                <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-emerald-400" />
                  Autorité de contrôle
                </h3>
                <p className="text-dark-300 text-sm mb-3">
                  Si vous estimez que vos droits ne sont pas respectés, vous avez le droit
                  d&apos;introduire une réclamation auprès de la Commission Nationale de
                  l&apos;Informatique et des Libertés (CNIL) :
                </p>
                <div className="space-y-2 text-sm text-dark-300">
                  <p>
                    <strong className="text-white">CNIL</strong> - 3 Place de Fontenoy, TSA 80715, 75334 Paris Cedex 07
                  </p>
                  <p>
                    <strong className="text-white">Site web :</strong>{' '}
                    <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 transition-colors">
                      www.cnil.fr
                    </a>
                  </p>
                  <p>
                    <strong className="text-white">Téléphone :</strong> 01 53 73 22 22
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Footer note */}
          <div className="mt-12 pt-8 border-t border-dark-800">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-dark-400 text-sm">
                Cette politique est conforme au RGPD (UE) 2016/679
              </p>
              <Link
                href="/mentions-legales"
                className="text-violet-400 hover:text-violet-300 transition-colors text-sm"
              >
                Voir les mentions légales →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
