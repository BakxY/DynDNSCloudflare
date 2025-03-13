import { getPubIP } from './get-ip';

describe('Testing public ip fetching', () => {
    test('Function promise resolves', () => {
        expect(getPubIP(false)).resolves
    });
    test('Function returns defined values', async () => {
        expect(await getPubIP(false)).toBeDefined()
    });
    test('Function returns a IPv4 address', async () => {
        expect(await getPubIP(false)).toMatch(/(\b25[0-5]|\b2[0-4][0-9]|\b[01]?[0-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}/)
    });
    test('Function returns defined values', async () => {
        expect(await getPubIP(false)).toBeDefined()
    });
    it('Function doesn\'t print new ip to console', async () => {
        let consoleSpy = jest.spyOn(console, 'info').mockImplementation(() => { });

        await getPubIP(false)

        expect(consoleSpy).not.toHaveBeenCalled()

        expect(consoleSpy).toHaveBeenCalledTimes(0);
    });
    it('Function prints new ip to console', async () => {
        let consoleSpy = jest.spyOn(console, 'info').mockImplementation(() => { });

        await getPubIP(true)

        expect(consoleSpy).toHaveBeenCalled()

        expect(consoleSpy).toHaveBeenCalledTimes(1);

        expect(consoleSpy.mock.calls[0][0]).toContain('[  IP  ] Current public IP is ');
    });
});