export function formatCharacter(event: any) {
    let input = event.target.value;
    input = input.replace(/[^a-zA-Z\s]/g, '');
    return event.target.value = input;
}
