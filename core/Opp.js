.factory('Opp', function(http) {

  var Opp = {}


  function inFuture(date) {
    var now = new Date()
    if (!(date instanceof Date)) date = new Date(date)
    return date > now
  }
  function inPast(date) {
    var now = new Date()
    if (!(date instanceof Date)) date = new Date(date)
    return date < now
  }

  Opp.getPhase = function(opp) {

    if (inPast(opp.submission_start_date) && inFuture(opp.submission_end_date))
      return 'submission'
    else if (inPast(opp.voting_start_date) && inFuture(opp.voting_end_date))
      return 'voting'
    else if (inPast(opp.winners_date))
      return 'winners'
  }

  Opp.inVoting = function(opp) {
    return (inPast(opp.voting_start_date) && inFuture(opp.voting_end_date))
  }

  return Opp

})
