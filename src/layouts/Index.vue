<template>
  <component :is="specificLayout"></component>
</template>

<script>
  export default {
    data() {
      // TR Burası şunun için var; daha admin layout ile lecturer layout
      // arasında bir fark yok, ve bu yüzden iki tane aynı içerikli
      // dosyaya ihtiyacımız yok. kısaca burada layout redirect
      // yapıyoruz.
      // [LYTRDRCT]
      let role = this.$store.state.user.role;
      if (role === 'lecturer') {
        role = 'admin';
      }

      return {
        specificLayout: () => import(`layouts/${role}`), // Also can be 'Admin'
        //
      };
    },
  };
</script>
