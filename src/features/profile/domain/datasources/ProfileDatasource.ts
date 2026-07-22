export abstract class ProfileDatasource {
    abstract uploadProfilePicture(file: File): Promise<string>;
}