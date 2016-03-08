angular.module('starter.services', [])

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
});