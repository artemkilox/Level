import {$host} from "./index";
    // ?project=nizheg
export const fetchApartments = async () => {
    const apartments = await $host.get('?project=nizheg').then(result => result.data)
    return {apartments}
}