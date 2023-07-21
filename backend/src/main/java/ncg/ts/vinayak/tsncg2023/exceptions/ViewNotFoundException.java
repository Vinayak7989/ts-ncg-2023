package ncg.ts.vinayak.tsncg2023.exceptions;

public class ViewNotFoundException extends RuntimeException {
    public ViewNotFoundException(Long id) {
        super("Could not find view of " + id);
    }
}