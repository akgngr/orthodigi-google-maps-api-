<template>
  <div class="about">
        <title>Orthodigi | Doktor Bul Hakkında..</title>

    <article class="prose">
      <h1>Uygulama Hakkında</h1>
      <p>
        Bu uygulamayı yapma amacımız beraber çalıştığımız doktorlarımızın
        listesini harita üzerinden il bazlı olarak göstermektir.
      </p>
      <p>
        Uygulamamız hazır olduğunda nasıl kullanılacağı hakkında kısa
        bilgilendirmeleri burada bulabilirsiniz.
      </p>
    </article>
  </div>
</template>

<script>
export default {
  metaInfo: {
    title: "Orthodigi",
    titleTemplate: "%s | Doktor Bul Uygulaması Hakkında..",
  }
};
</script>

<style>
.about {
  height: calc(100vh - 140px);
  @apply w-10/12 lg:w-8/12 pt-16 container m-auto lg:px-16;
}
</style>
