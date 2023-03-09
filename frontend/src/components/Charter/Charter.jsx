import React from "react";

function Charter() {
  return (
    <div className="absolute top-[14%]">
      <div className="text-justify font-semibold bg-dark-100 text-blueDuck-100 text-1xl mx-6 px-5 py-20 ">
        <h1 className="text-white text-3xl py-1">Charte d'utilisation : </h1>
        <br />
        <section>
          Bienvenue sur notre plateforme. <br />
          <br />
          Cette charte utilisateur est un outil pédagoqique et n'a en aucun cas
          été réalisée et validée par un(e) juriste. Nous souhaitons néanmoins
          vous présenter notre charte afin que vous puissiez comprendre comment
          nous gérons vos données et votre vie privée. <br />
          <p className="text-center underline">
            Gestion des données utilisateur
          </p>
          <br />
          <br /> Pour vous fournir les services que vous avez demandés. Nous
          collectons des données personnelles nécessaires à l'utilisation de
          notre plateforme : Noms, prénoms et adresse e-mail. Nous ne vendrons
          ni ne louerons jamais vos données personnelles à des tiers. Nous ne
          partagerons vos données personnelles qu'avec vous . Et en aucun cas
          avec les autres utilisateurs de notre plateforme.
        </section>
        <br />
        <p className="text-center underline">Stockage/RGPD/droit à l'oubli</p>
        <br />
        <section>
          Nous stockons vos données personnelles pour vous authentifier et vous
          permettre d'accéder à notre plateforme sans avoir à entrer à nouveau
          vos informations d'identification. Nous respectons la réglementation
          européenne sur la protection des données (RGPD). Nous nous engageons
          donc, à protéger vos données. <br />
          Vous avez le droit de rectifier ou de supprimer vos données
          personnelles depuis la rubrique "Mon profil" du menu de l'application.
          Nous nous engageons également à respecter votre droit à l'oubli sur
          internet. De plus, en prenant connaissance de cette charte, les
          membres du jury acceptent sans condition de valider le Titre RNCP des
          membres du groupe de Projet GD_Salles :) Nous espérons que cette
          charte utilisateur vous a aidé à comprendre comment nous gérons vos
          données et votre vie privée sur notre plateforme.
        </section>
      </div>
      <div className="h-28" />
    </div>
  );
}

export default Charter;
