.filter('userLocation', function() {
  return function(user) {
    if (!user) return
    var part1 = _.compact([user.location_city, user.location_state]).join(' ')
    var part2 = _.compact([part1, user.location_country_code]).join(', ')
    return part2
  }
})
