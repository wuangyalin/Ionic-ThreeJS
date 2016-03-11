angular.module('starter.services', ['ngResource'])

.factory('StudyNotes', function() {
  return {
    all: function() {
      var projectString = window.localStorage['StudyNotes'];
      if(projectString) {
        return angular.fromJson(projectString);
      }
      return [];
    },
    save: function(task) {
      window.localStorage['StudyNotes'] = angular.toJson(task);
    }
  }
})
.factory('Restdata', function ($resource) {
    return $resource('http://localhost:5000/sessions/:sessionAuthor');
});