.factory('oppLogic', function(http) {


  var oppLogic = {}

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

  oppLogic.getPhase = function(opp) {
    if (oppLogic.inSubmission(opp))
      return 'submission'
    else if (oppLogic.inVoting(opp))
      return 'voting'
    else if (oppLogic.winnersAnnounced(opp))
      return 'winners'
    else
      return 'listen'
  }

  oppLogic.inSubmission = function(opp) {
    return (inPast(opp.submission_start_date) && inFuture(opp.submission_end_date))
  }

  oppLogic.inVoting = function(opp) {
    return (inPast(opp.voting_start_date) && inFuture(opp.voting_end_date))
  }

  oppLogic.inListenAndVote = function(opp) {
    return (inPast(opp.submission_end_date) && inFuture(opp.winners_date))
  }

  oppLogic.winnersAnnounced = function(opp) {
    return (inPast(opp.winners_date))
  }

  return oppLogic

})
