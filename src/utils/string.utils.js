export function CapCase(string) {
	return string.replace(/[-_]/, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}