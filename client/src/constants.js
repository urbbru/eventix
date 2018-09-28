export const baseUrl = process.env.REACT_APP_APIURL || 'http://localhost:4000'

export const localStorageJwtKey = 'currentUserJwt'

export const giveColor = (fraudPercentage) => {
    if(fraudPercentage <= 33) return "green"
    if(fraudPercentage >= 33 && fraudPercentage <= 66) return "yellow"
    if(fraudPercentage >= 67) return "red"
}

export const fraudCalculator = (ticket, tickets, event) => {
    if(Object.keys(tickets).length === 0 || Object.keys(event).length === 0) { 
        return "..Loading"
    } else {
        let fraudPercentage = 5
        const currentTicket = ticket
        const allTicketsOfUser = tickets.tickets
        const allTicketsOfEvent = event.tickets
        let avgPrice = 0

        if(allTicketsOfUser.length === 1) fraudPercentage += 10

        const ticketsForAvgPrice = allTicketsOfEvent.filter(event => event.id !== currentTicket.id)
        if(ticketsForAvgPrice.length === 0) {
            avgPrice = currentTicket.event.price
        } else {
            const sumPrice = ticketsForAvgPrice.reduce((acc, currV) => ({price: acc.price + currV.price}))
            avgPrice = sumPrice.price / ticketsForAvgPrice.length
        }

        const compareTicketToAvgPrice = ticket.price / avgPrice

        if(compareTicketToAvgPrice > 1) {
            const percentage = Math.round((compareTicketToAvgPrice - 1) * 100)
            if(percentage <= 10) fraudPercentage -= percentage
            if(percentage > 10) fraudPercentage -= 10
        } else {
            const percentage = Math.round((compareTicketToAvgPrice - 1) * 100)
            fraudPercentage += Math.abs(percentage)
        }
        
        const datePosted = new Date(currentTicket.date)
        const hourPosted = datePosted.getHours()
        if(hourPosted >= 9 && hourPosted <= 17) fraudPercentage -= 10
        if(hourPosted < 9 || hourPosted > 17) fraudPercentage += 10
        
        if(currentTicket.comments.length > 3) fraudPercentage += 5

        if(fraudPercentage > 95) fraudPercentage = 95
        if(fraudPercentage < 5) fraudPercentage = 5
        return fraudPercentage
    }
}