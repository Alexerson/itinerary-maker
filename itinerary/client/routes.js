Router.configure({
  layoutTemplate: 'layout'
});

Router.map(function () {
  /**
   * The route's name is "home"
   * The route's template is also "home"
   * The default action will render the home template
   */
  this.route('home', {
    path: '/',
    template: 'home'
  });

  // this.route('cities', {
  //   path: '/cities'
  // });

  this.route('cities', {
    path: '/cities/:_name',
    data: function() {
      return this.params.name;
    },
    template: 'city'
  });

  this.route('admin', {
    path: '/admin',
    template: 'admin'
  });

  this.route('destination_entry', {
    path: '/destination_entry',
    template: 'destination_entry'
  });
});