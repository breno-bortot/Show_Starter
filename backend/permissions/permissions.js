function canViewSupporter (supporter, params) {
    return (
        supporter.role === 'admin' || 
        supporter.id === params.id
    )
}
function canViewCreator (creator, params) {
    return (
        creator.role === 'admin' || 
        creator.id === params.id
    )
}

module.exports = {
    canViewSupporter,
    canViewCreator
}